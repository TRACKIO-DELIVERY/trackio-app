import { SafeAreaView } from "react-native";

import { styles } from "./styles";
import { LoginForm } from "@/components/Molecules/LoginForm";

import Icon from "@/assets/icons/icon.svg";
export function Login() {
  return (
    <SafeAreaView style={styles.container}>
      <Icon style={{ alignSelf: "center" }} />
      <LoginForm />
    </SafeAreaView>
  );
}
