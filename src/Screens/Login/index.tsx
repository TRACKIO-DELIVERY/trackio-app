import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "./styles";
import { LoginForm } from "@/components/Molecules/LoginForm";

import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button } from "@/components/Atoms/Button";
import { Input } from "@/components/Atoms/Input";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Role } from "@/@types/models/user";
export function Login() {
  //teste
  const [loginRole, setLoginRole] = useState<Role | null>(null);
  const [customerId, setCustomerId] = useState("");
  const { testLogin } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      {loginRole ? (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={styles.scroll}>
              <Image
                source={require("@/assets/logo/logo.png")}
                style={{ width: 130, height: 130, alignSelf: "center" }}
              />

              <LoginForm />

              {/*teste */}
              <Input placeholder="id" onChangeText={setCustomerId} />
              <Button
                title="login test"
                onPress={() => testLogin(Number(customerId), loginRole)}
              />
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      ) : (
        <View style={styles.roleContainer}>
          <Text style={styles.roleTitle}>Você é?</Text>

          <View style={styles.roleButtons}>
            <Button title="Cliente" onPress={() => setLoginRole("CUSTOMER")} />

            <Button
              title="Entregador"
              onPress={() => setLoginRole("DELIVERY")}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
