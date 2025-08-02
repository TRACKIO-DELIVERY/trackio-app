import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView, ScrollView, TouchableWithoutFeedback, Image
} from "react-native";

import { styles } from "./styles";
import { RegisterForm } from "@/components/Molecules/RegisterForm";



export function Register() {
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


            <RegisterForm />

          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
