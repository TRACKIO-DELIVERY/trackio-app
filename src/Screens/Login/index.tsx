import { styles } from "./styles";

import { Image, Text, View } from "react-native";
import { Button } from "@/components/Atoms/Button";

import { useAuth } from "@/contexts/Auth";

export function Login() {
  const { loginWithKeycloak } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>TrackIO</Text>
      <Text style={styles.subtitle}>
        Serviço de rastreamento de delivery para clientes e entregadores
      </Text>
      <Image
        source={require("@/assets/logo/logo.png")}
        style={{ width: 190, height: 190, alignSelf: "center" }}
      />

      <Button title="Entrar" onPress={() => loginWithKeycloak()} />

      <Text style={styles.footer}>
        Acompanhe e gerencie entregas em tempo real
      </Text>
    </View>
  );
}
