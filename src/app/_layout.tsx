import * as SplashScreen from "expo-splash-screen";

import { Slot, Stack } from "expo-router";

import { useFonts } from "expo-font";
import {
  Sen_400Regular,
  Sen_500Medium,
  Sen_600SemiBold,
  Sen_700Bold,
} from "@expo-google-fonts/sen";

import { useEffect, useState } from "react";
import "react-native-reanimated";
import { StatusBar } from "expo-status-bar";

//import { AuthProvider } from "@/contexts/AuthContext";
import { LocationProvider } from "@/contexts/LocationContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Loading } from "@/components/Atoms/Loading";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "@/contexts/Auth";
import { RouteGuard } from "@/guards/routeGuard";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Sen_400Regular,
    Sen_500Medium,
    Sen_600SemiBold,
    Sen_700Bold,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return <Loading />;
  }

  return <RootLayoutNav />;
}

export function RootLayoutNav() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <AuthProvider>
          <RouteGuard>
            <LocationProvider>
              <StatusBar translucent style="dark" />
              <Slot />
            </LocationProvider>
          </RouteGuard>
        </AuthProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
