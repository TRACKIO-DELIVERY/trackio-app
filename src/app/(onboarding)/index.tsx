import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { Button } from "@/components/Atoms/Button";
import { GoBackButton } from "@/components/Atoms/GoBackButton";
import { useAuth } from "@/contexts/Auth";

export default function OnboardingRoleScreen() {
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <GoBackButton onPress={logout} />
      <Text style={styles.title}>Bem-vindo ao TrackIO </Text>
      <Text style={styles.subtitle}>Como você deseja usar o aplicativo?</Text>

      <Button
        onPress={() => router.push("/(onboarding)/customer")}
        title="Sou cliente"
      />

      <Button
        variant="secondary"
        onPress={() => router.push("/(onboarding)/delivery")}
        title="Sou entregador"
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    gap: 14,
    backgroundColor: "#ffff",
    marginBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: "center",
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#4F46E5",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  secondary: {
    backgroundColor: "#22C55E",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
