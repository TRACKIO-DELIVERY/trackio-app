import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";

import { Loading } from "@/components/Atoms/Loading";
import { useAuth } from "@/contexts/Auth";

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const segments = useSegments();

  const { status, user } = useAuth();

  const inAuthGroup = segments[0] === "(auth)";
  const inCustomerGroup = segments[0] === "(customer)";
  const inDeliveryGroup = segments[0] === "(deliver)";
  const isInOnboardingGroup = segments[0] === "(onboarding)";

  useEffect(() => {
    console.log("STATUS", status);
    if (status === "loading") return;

    if (status === "unauthenticated") {
      if (!inAuthGroup) {
        router.replace("/(auth)/login");
      }
      return;
    }
    if (status === "onboarding" && !user) {
      if (!isInOnboardingGroup) {
        router.replace("/(onboarding)");
      }
      return;
    }

    if (!user) return;

    if (user.role === "CUSTOMER" && !inCustomerGroup) {
      router.replace("/(customer)/(tabs)");
      return;
    }

    if (user.role === "DELIVERY" && !inDeliveryGroup) {
      router.replace("/(deliver)/(tabs)");
      return;
    }
  }, [status, user, segments]);

  if (status === "loading") {
    return <Loading />;
  }

  return <>{children}</>;
}
