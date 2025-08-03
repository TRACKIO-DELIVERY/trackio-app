import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "./styles";
import { LoginForm } from "@/components/Molecules/LoginForm";

import { Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, View } from "react-native";
export function Login() {
  return (
    <SafeAreaView style={styles.container}>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}

      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scroll}>
            <Image
              source={require('@/assets/logo/logo.png')}
              style={{ width: 130, height: 130, alignSelf: "center" }} />

            <LoginForm />

          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
