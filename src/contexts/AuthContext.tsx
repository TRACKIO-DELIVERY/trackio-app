import { User } from "@/@types/user";
import { useRouter, useSegments } from "expo-router";
import {
  createContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  isAuth: boolean;
  user: User | null;
  setUser: (user: User) => void;
  signIn: () => void;
  signOut: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuth, setIsAuth] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const rootSegment = useSegments()[0];
  const router = useRouter();

  const mockUser: User = {
    name: "Ze da manga",
    email: "mangaze@gmail.com",
  };

  function fetchUser() {
    setUser(mockUser);
  }

  function signIn() {
    try {
      setIsLoading(true);
      fetchUser();
      setIsAuth(true);
      router.replace('/')
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function signOut() {
    setIsLoading(true);
    setUser(null);
    setIsAuth(false);
    router.replace("/login");
    setIsLoading(false);
  }

  useEffect(() => {
    if (isLoading) return;
    const routeIsPrivate = rootSegment === "(tabs)";

    if (!isAuth && routeIsPrivate) {
      router.replace("/login");
    } else if (isAuth && !routeIsPrivate) {
      router.replace("/");
    }
  }, [isLoading, rootSegment, isAuth]);
  return (
    <AuthContext.Provider
      value={{
        isAuth,
        isLoading,
        user,
        setUser,
        signIn,
        signOut,
      }}
    >
      {isLoading ? null : children}
    </AuthContext.Provider>
  );
}
