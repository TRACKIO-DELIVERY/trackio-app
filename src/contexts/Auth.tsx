import { createContext, useContext, useEffect, useState } from "react";
import {
  getTokensStorage,
  removeTokensStorage,
  setTokensStorage,
} from "@/storage/authTokens";
import { useAuthRequest } from "expo-auth-session";
import {
  authConfig,
  CLIENT_ID,
  discovery,
  KEYCLOAK_HOST,
  REALM,
  redirectUri,
} from "@/services/keycloack";
import { Customer, DeliveryPerson, Role } from "@/@types/models/user";

import { api } from "@/services/api";
import * as WebBrowser from "expo-web-browser";
import { Alert } from "react-native";
import { socket } from "@/services/socket";
import { UserPayload } from "@/@types/api/userPayload";
import { Loading } from "@/components/Atoms/Loading";
import { Socket } from "socket.io-client";

WebBrowser.maybeCompleteAuthSession();

type AuthStatus =
  | "loading"
  | "unauthenticated"
  | "authenticated"
  | "onboarding";

interface AuthState {
  status: AuthStatus;
  accessToken: string | null;
  refreshToken: string | null;
}

interface AuthContextType extends AuthState {
  loginWithKeycloak: () => Promise<void>;
  user: Customer | DeliveryPerson | null;
  logout: () => Promise<void>;

  completeOnboarding: (role: Role, payload: UserPayload) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Customer | DeliveryPerson | null>(null);
  const [state, setState] = useState<AuthState>({
    status: "loading",
    accessToken: null,
    refreshToken: null,
  });

  const [bootstrapped, setBootstrapped] = useState(false);
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [processedCode, setProcessedCode] = useState<string | null>(null);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID!,
      redirectUri: redirectUri,
      scopes: authConfig.scopes,
      usePKCE: authConfig.usePKCE,
      responseType: authConfig.responseType,
    },
    discovery,
  );

  const exchangeCodeForToken = async (code: string) => {
    try {
      const params = new URLSearchParams({
        grant_type: "authorization_code",
        client_id: CLIENT_ID!,
        code: code,
        redirect_uri: redirectUri,
        code_verifier: request?.codeVerifier || "",
      });

      const res = await fetch(discovery.tokenEndpoint!, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });

      if (!res) {
        console.error("Erro ao obter token");
        setBootstrapped(true);
        return;
      }
      const data = await res.json();
      const access = data.access_token;
      const refresh = data.refresh_token;

      if (!access || !refresh) {
        console.error("❌ Tokens não recebidos");
        setBootstrapped(true);
        return;
      }
      console.log("auth", { access, refresh });

      await setTokensStorage(access, refresh);
      setState({
        status: "loading",
        accessToken: access,
        refreshToken: refresh,
      });

      await fetchMe();
    } catch (error) {
      console.error("Erro na troca de token:", error);
      setBootstrapped(true);
    }
  };

  async function fetchMe() {
    try {
      const res = await api.get("/user/me");

      setUser(res.data);
      setState({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        status: "authenticated",
      });
    } catch (err: any) {
      const status = err.response?.status;
      const errorData = err.response?.data;

      if (status === 404) {
        setState((prev) =>
          prev.status !== "onboarding"
            ? { ...prev, status: "onboarding" }
            : prev,
        );
        return;
      }

      if (status === 401) {
        await logout();
        return;
      }

      setState((prev) => ({
        ...prev,
        status: "onboarding",
      }));
    }
  }

  async function completeOnboarding(role: Role, payload: UserPayload) {
    if (state.status === "loading" || isOnboarding) return;

    setIsOnboarding(true);

    try {
      const endpoint = role === "CUSTOMER" ? "/customer" : "/deliveryperson";
      await api.post(endpoint, payload);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      await fetchMe();
    } catch (error: any) {
      console.error(" Erro onboarding:", error.response?.data);
      Alert.alert("Erro", "Cadastro não pode ser concluído");
      throw error;
    } finally {
      setIsOnboarding(false);
    }
  }

  async function restoreSession() {
    try {
      const tokens = await getTokensStorage();
      console.log(tokens);
      if (!tokens?.access) {
        setState({
          status: "unauthenticated",
          accessToken: null,
          refreshToken: null,
        });
        setBootstrapped(true);
        return;
      }

      setState({
        status: "loading",
        accessToken: tokens.access,
        refreshToken: tokens.refresh,
      });

      await fetchMe();
    } catch (error) {
      setState({
        status: "unauthenticated",
        accessToken: null,
        refreshToken: null,
      });
    } finally {
      setBootstrapped(true);
    }
  }

  async function loginWithKeycloak() {
    if (!request) {
      console.error("Request ainda não está pronto");
      return;
    }

    await promptAsync();
  }

  async function logout() {
    const tokens = await getTokensStorage();

    if (tokens?.refresh) {
      try {
        await fetch(discovery.endSessionEndpoint!, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            client_id: CLIENT_ID!,
            refresh_token: tokens.refresh,
          }).toString(),
        });
      } catch (error) {
        console.log(" Erro logout Keycloak:", error);
      }
    }

    await removeTokensStorage();
    setUser(null);
    setState({
      status: "unauthenticated",
      accessToken: null,
      refreshToken: null,
    });
  }

  //restaura sessão existente
  useEffect(() => {
    restoreSession();
  }, []);

  //escuta responses do keycloack
  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;

      if (code !== processedCode) {
        setProcessedCode(code);
        exchangeCodeForToken(code);
      }
    } else if (response?.type === "error") {
      console.error("Erro no login:", response.error);
      setBootstrapped(true);
    }
  }, [response]);

  useEffect(() => {
    console.log(
      "🔍 [Socket Debug] useEffect rodou. Status atual:",
      state.status,
    );

    if (state.status === "authenticated" && user) {
      const onConnect = () =>
        console.log("🟢 [Socket Debug] Passo 4: EVENTO CONNECT DISPARADO!");
      const onConnectError = (err: any) =>
        console.log("🔴 [Socket Debug] ERRO DE CONEXÃO:", err);
      const onDisconnect = () => console.log("🟡 [Socket Debug] DISCONECTADO");

      socket.on("connect", onConnect);
      socket.on("connect_error", onConnectError);
      socket.on("disconnect", onDisconnect);

      socket.connect();

      return () => {
        socket.off("connect", onConnect);
        socket.off("connect_error", onConnectError);
        socket.off("disconnect", onDisconnect);
        socket.disconnect();
      };
    } else {
      console.log("[Socket Debug] Condição negada. Socket não será conectado.");
    }
  }, [state.status, user]);

  if (!bootstrapped) {
    return <Loading />;
  }
  return (
    <AuthContext.Provider
      value={{
        ...state,
        loginWithKeycloak,
        logout,
        user,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
