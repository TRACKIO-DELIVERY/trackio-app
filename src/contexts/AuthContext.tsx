import { User, Customer, DeliveryPerson, Role } from "@/@types/models/user";
import { useLogin } from "@/services/queries/useLogin";
import { useRegister } from "@/services/queries/useRegister";
import { useRouter, useSegments } from "expo-router";
import { createContext, useEffect, useState } from "react";
import { api } from "@/services/api";
import {
  getTokensStorage,
  removeTokensStorage,
  setTokensStorage,
} from "@/storage";
import { useGoogleAuth } from "@/services/queries/useGoogleAuth";
import { getUserIdFromToken } from "@/utils/jwtDecode";
import {
  googleLoginParams,
  LoginParams,
  RegisterParams,
} from "@/@types/authParams";
import { socket } from "@/services/socket";
import { useCustomer } from "@/services/queries/useCustomer";

interface AuthContextType {
  user: Customer | DeliveryPerson | null;
  setUser: (user: Customer | DeliveryPerson) => void;
  login: (params: LoginParams) => void;
  register: (params: RegisterParams) => void;
  googleLogin: (params: googleLoginParams) => void;
  signOut: () => void;
  isLoading: boolean;
  testLogin: (customerId: number, role: Role) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<Customer | DeliveryPerson | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: signUpMutation } = useRegister();
  const { mutate: signInMutation } = useLogin();
  const { mutate: loginGoogleMutation } = useGoogleAuth();

  const rootSegment = useSegments()[0];
  const router = useRouter();

  async function fetchUser(token: string) {
    //const userId = getUserIdFromToken(token);

    // if (!userId) {
    //   setIsAuth(false);
    //   setIsLoading(false);
    //   return;
    // }

    //const { data } = await api.get(`/api/users/${userId}/`);

    setIsAuth(true);

    // setUser({
    //   userId: data.userId,
    //   image_url: data.imageUrl ?? "",
    //   username: data.username,
    //   dateOfBirth: data.dateOfBirth,
    //   email: data.email,
    //   role: data.role,
    //   cpf: data.cpf,
    //   phone: data.phone,
    // });
  }

  async function userIsAuthenticated() {
    try {
      setIsLoading(true);
      const tokens = await getTokensStorage();
      if (!tokens?.access && !tokens?.refresh) {
        setIsAuth(false);
        setIsLoading(false);
        return;
      }

      setIsAuth(true);
      //fetchUser(tokens?.access);
    } catch (error) {
      console.log("Error checking user authenticated", error);
    } finally {
      setIsLoading(false);
    }
  }

  function register(params: RegisterParams) {
    setIsLoading(true);

    signUpMutation(params, {
      onSuccess: () => {
        setIsAuth(false);
        setIsLoading(false);
        alert("Cadastrado com sucesso!");
      },
      onError: (error: any) => {
        setIsLoading(false);

        console.log(error.message);
        alert("Erro: " + error.response?.data?.detail || error.message);
      },
    });
  }

  function login(params: LoginParams) {
    setIsLoading(true);
    signInMutation(params, {
      onSuccess: async (data) => {
        await setTokensStorage(data.access, data.refresh);

        fetchUser(data.access);
        setIsAuth(true);
        setIsLoading(false);

        //rever isso
        router.push("/");
      },
      onError: (error) => {
        setIsLoading(false);
        setIsAuth(false);
        console.log("ERRO LOGIN:", error);
        alert("Não foi possível realizar o login");
      },
    });
  }

  async function testLogin(customerId: number, role: Role) {
    switch (role) {
      case "CUSTOMER": {
        const { data, status } = await api.get<Customer>(
          `/customer/${customerId}`,
        );
        console.log(status);
        if (data) {
          setUser({
            userId: data.userId,
            image_url: data.image_url ?? "",
            username: data.username,
            dateOfBirth: data.dateOfBirth,
            email: data.email,
            role: data.role,
            cpf: data.cpf,
            phone: data.phone,
          });

          setIsAuth(true);
        }
        break;
      }
      case "DELIVERY":
        {
          const { data, status } = await api.get<DeliveryPerson>(
            `/deliveryperson/${customerId}`,
          );
          console.log(status);
          if (data) {
            setUser({
              userId: data.userId,
              image_url: data.image_url ?? "",
              username: data.username,
              dateOfBirth: data.dateOfBirth,
              email: data.email,
              role: data.role,
              cpf: data.cpf,
              phone: data.phone,
            });

            setIsAuth(true);
          }
        }
        break;

      default:
        console.warn("Role inválido:", role);
    }
  }

  async function googleLogin(params: googleLoginParams) {
    setIsLoading(true);

    loginGoogleMutation(params, {
      onSuccess: async (data) => {
        await setTokensStorage(data.access, data.refresh);
        setIsAuth(true);
        fetchUser(data.access);
        router.push("/");

        setIsLoading(false);
      },
      onError: (error: any) => {
        console.error("❌ Erro no loginGoogleMutation:");
        console.error("Mensagem:", error.message);
        console.error("Resposta completa:", error.response?.data);
        console.error("Status:", error.response?.status);
        alert("Falha no login com Google");
      },
    });
  }
  async function signOut() {
    setIsLoading(true);
    setUser(null);
    setIsAuth(false);
    await removeTokensStorage();
    router.replace("/login");
    setIsLoading(false);
  }

  // useEffect(() => {
  //   userIsAuthenticated();
  // }, []);

  //apenas para testes
  // useEffect(() => {
  //   fetchUser("teste");
  // }, []);
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = rootSegment === "(auth)";
    console.log(isAuth);

    if (!isAuth && !inAuthGroup) {
      router.replace("/(auth)/login");
    }
  }, [isLoading, rootSegment, isAuth]);

  useEffect(() => {
    if (!isAuth) return;

    if (user?.role == "CUSTOMER") {
      console.log(user?.role);
      router.replace("/(customer)/(tabs)");
    } else {
      console.log(user?.role);
      router.replace("/(deliver)/(tabs)");
    }
  }, [user, isAuth, user?.role]);

  useEffect(() => {
    if (isAuth && user) {
      if (!socket.connected) {
        const { connected } = socket.connect();
        if (connected) {
          console.log("🟢 Socket conectado globalmente");
        } else {
          console.log("🔴 Socket não conectado ");
        }
      }
    } else {
      if (socket.connected) {
        socket.disconnect();
        console.log("🔴 Socket desconectado");
      }
    }
  }, [isAuth, user]);
  return (
    <AuthContext.Provider
      value={{
        isLoading,
        user,
        setUser,
        login,
        register,
        signOut,
        googleLogin,
        testLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
