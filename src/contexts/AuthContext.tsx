import { User, Customer, DeliveryPerson } from "@/@types/models/user";
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

interface AuthContextType {
  user: Customer | DeliveryPerson | null;
  setUser: (user: Customer | DeliveryPerson) => void;
  login: (params: LoginParams) => void;
  register: (params: RegisterParams) => void;
  googleLogin: (params: googleLoginParams) => void;
  signOut: () => void;
  isLoading: boolean;
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
    const data = {
      user_id: 1,
      name: "karen",
      birth_date: "21/09/2003",
      image_url: "",
      email: "ka@gmail.com",
      role: "entregador",
      cpf: "12345678",
      phone: "23456789",
    };

    setIsAuth(true);

    setUser({
      userId: data.user_id,
      imageUrl: data.image_url ?? "",
      name: data.name,
      birthDate: data.birth_date,
      email: data.email,
      role: data.role,
      cpf: data.cpf,
      phone: data.phone,
    });
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
      fetchUser(tokens?.access);
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
  useEffect(() => {
    fetchUser("teste");
  }, []);
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = rootSegment === "(auth)";
    console.log(isAuth);
    if (!isAuth && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (isAuth && inAuthGroup) {
      if (user?.role == "cliente") {
        router.replace("/(customer)");
      } else {
        router.replace("/(deliver)");
      }
    }
  }, [isLoading, rootSegment, user, isAuth]);
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
      }}
    >
      {isLoading ? null : children}
    </AuthContext.Provider>
  );
}
