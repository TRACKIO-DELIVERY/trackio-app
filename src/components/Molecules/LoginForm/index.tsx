import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormType, LoginSchema } from "./schema";

import EmailIcon from "@/assets/icons/email.svg";
import LockIcon from "@/assets/icons/lock.svg";

import { Input } from "@/components/Atoms/Input";
import { Button } from "@/components/Atoms/Button";
import { TYPOGRAPHY } from "@/constants/typography";
import { router } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { GoogleLoginButton } from "../GoogleButton";

export function LoginForm() {
  const { login } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(LoginSchema),
  });

  async function handleLogin(data: LoginFormType) {
    await login(data);
  }

  function goToRegister() {
    router.push("/register");
  }
  return (
    <View style={styles.form}>
      <View style={styles.inputsContainer}>
        <View style={styles.inputView}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                icon={EmailIcon}
                placeholder="Email"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Text style={TYPOGRAPHY.errorText}>
            {errors && errors.email?.message}
          </Text>
        </View>

        <View style={styles.inputView}>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                icon={LockIcon}
                placeholder="Senha"
                onChangeText={onChange}
                isPasswordInput
                value={value}
              />
            )}
          />
          <Text style={TYPOGRAPHY.errorText}>
            {errors && errors.password?.message}
          </Text>
        </View>

        <Text style={TYPOGRAPHY.alertText}>Esqueceu a senha?</Text>
      </View>

      <Button title="Enviar" onPress={handleSubmit(handleLogin)} />
      <GoogleLoginButton />

      <TouchableOpacity style={styles.linkToRegister} onPress={goToRegister}>
        <Text style={TYPOGRAPHY.alertText}>
          Não tem conta? Faça seu cadastro
        </Text>
      </TouchableOpacity>
    </View>
  );
}
