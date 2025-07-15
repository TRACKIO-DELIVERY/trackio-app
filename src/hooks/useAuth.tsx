import { User } from "@/@types/user";
import { useRouter, useSegments } from "expo-router";
import {
  Children,
  createContext,
  useContext,
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

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuth, setIsAuth] = useState(false);
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

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
