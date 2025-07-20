import { SafeAreaView } from "react-native";

import { styles } from "./styles";
import { RegisterForm } from "@/components/Molecules/RegisterForm";


import Icon from "@/assets/icons/icon.svg";
export function Register() {
  return (
    <SafeAreaView style={styles.container}>
      <Icon style={{ alignSelf: "center" }} />
      <RegisterForm />
    </SafeAreaView>
  );
}
