import { User } from "@/@types/user";
import { LoginParams, useLogin } from "@/services/queries/useLogin";
import { RegisterParams, useRegister } from "@/services/queries/useRegister";
import { useRouter, useSegments } from "expo-router";
import { createContext, useEffect, useState } from "react";
import { api } from "@/services/api";
import { getTokenStorage, removeTokenStorage, setTokenStorage } from "@/storage";
import { useGoogleAuth } from "@/services/queries/useGoogleAuth";
import { getUserIdFromToken } from "@/utils/jwtDecode";

interface AuthContextType {
  user: User | null;
  setUser: (user: User) => void;
  login: (params: LoginParams) => void;
  register: (params: RegisterParams) => void;
  googleLogin: (params: string) => void;
  signOut: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: signUpMutation } = useRegister()
  const { mutate: signInMutation } = useLogin()
  const { mutate: loginGoogleMutation } = useGoogleAuth()

  const rootSegment = useSegments()[0];
  const router = useRouter();

  async function fetchUser(token: string) {
    const userId = getUserIdFromToken(token);
    if (!userId) {
      setIsAuth(false);
      setIsLoading(false);
      return;
    }
    console.log(userId)

    const { data } = await api.get(`/api/users/${userId}/`);
    setUser({
      user_id: data.id,
      avatar: data.avatar ?? '',
      name: data.name,
      birth_date: data.birth_date,
      email: data.email,
    });
  }

  async function userIsAuthenticated() {
    try {
      setIsLoading(true)
      const access = await getTokenStorage()
      if (!access) {
        delete api.defaults.headers.common['Authorization']
        setIsAuth(false)
        setIsLoading(false)
        return
      }

      setIsAuth(true)
      api.defaults.headers.common['Authorization'] = `Bearer ${access}`

      fetchUser(access)

    } catch (error) {
      console.log('Error checking user authenticated', error)
    } finally {
      setIsLoading(false)
    }
  }


  function register(params: RegisterParams) {
    setIsLoading(true)

    signUpMutation(params, {
      onSuccess: (() => {
        setIsLoading(false)
        router.push('/login')
      }),
      onError: ((error) => {
        setIsLoading(false)

        console.log(error)
        alert("Erro no registro")
      })
    })
  }

  function login(params: LoginParams) {
    setIsLoading(true)
    signInMutation(params, {
      onSuccess: (async (data) => {
        await setTokenStorage(data.access)

        fetchUser(data.access)
        setIsAuth(true)
        setIsLoading(false)

        router.push('/(tabs)')
      }),
      onError: ((error) => {
        setIsLoading(false)
        setIsAuth(false)

        console.log(error)
        alert("Não foi possível realizar o login")
      })
    })
  }

  async function googleLogin(params: string) {
    setIsLoading(true)

    loginGoogleMutation(params, {
      onSuccess: (async (data) => {

        await setTokenStorage(data.token)
        setIsAuth(true)
        router.push('/(tabs)')

        setIsLoading(false)
      }),
      onError: ((error) => {
        console.error(error);
        alert('Falha no login com Google');
      })
    })

  }
  async function signOut() {
    setIsLoading(true);
    setUser(null);
    setIsAuth(false)
    await removeTokenStorage()

    router.replace("/login");
    setIsLoading(false);
  }

  useEffect(() => {
    userIsAuthenticated()
  }, [])

  useEffect(() => {
    if (isLoading) return;
    const routeIsPrivate = rootSegment === "(tabs)";

    if (!isAuth && routeIsPrivate) {
      router.replace("/login");
    } else if (isAuth && !routeIsPrivate) {
      router.replace("/(tabs)");
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
        googleLogin
      }}
    >
      {isLoading ? null : children}
    </AuthContext.Provider>
  );
}
