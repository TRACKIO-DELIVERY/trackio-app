import { SafeAreaView } from "react-native";

import { styles } from "./styles";
import { LoginForm } from "@/components/Molecules/LoginForm";

export function Login() {
  return (
    <SafeAreaView style={styles.container}>
      <LoginForm />
    </SafeAreaView>
  );
}
