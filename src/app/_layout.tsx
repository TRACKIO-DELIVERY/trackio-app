import * as SplashScreen from "expo-splash-screen";

import { Slot } from "expo-router";

import { useFonts } from "expo-font";
import {
  Sen_400Regular,
  Sen_500Medium,
  Sen_600SemiBold,
  Sen_700Bold,
} from "@expo-google-fonts/sen";

import { useEffect } from "react";
import "react-native-reanimated";
import { ActivityIndicator, StatusBar, View } from "react-native";
import { AuthProvider } from "@/contexts/AuthContext";
import { LocationProvider } from "@/contexts/LocationContext";


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
function Loading() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator />
    </View>
  );
}

export function RootLayoutNav() {
  return (
    <AuthProvider>
      <LocationProvider>
        <StatusBar barStyle="default" />
        <Slot />
      </LocationProvider>
    </AuthProvider>
  );
}
