import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormType, RegisterSchema } from "./schema";

import { useAuth } from "@/hooks/useAuth";

import EmailIcon from "@/assets/icons/email.svg";
import UserIcon from "@/assets/icons/user.svg";
import LockIcon from "@/assets/icons/lock.svg";
import GoogleIcon from "@/assets/icons/google.svg";

import { Input } from "@/components/Atoms/Input";
import { Button } from "@/components/Atoms/Button";
import { TYPOGRAPHY } from "@/constants/typography";
import { router } from "expo-router";
import { RegisterParams } from "@/services/queries/useRegister";

export function RegisterForm() {
  const { register } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterSchema),
  });

  console.log(errors)

  async function handleRegister(data: RegisterFormType) {

    const user: RegisterParams = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      userType: 3
    }
    await register(user);
  }

  function goToLogin() {
    router.push("/login");
  }
  return (
    <View style={styles.form}>
      <View style={styles.inputsContainer}>

        <View style={styles.inputView}>
          <Controller
            control={control}
            name="fullname"
            render={({ field: { onChange, value } }) => (
              <Input
                icon={UserIcon}
                placeholder="Nome Completo"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Text style={TYPOGRAPHY.errorText}>
            {errors && errors.fullname?.message}
          </Text>
        </View>

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

        <View style={styles.inputView}>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <Input
                icon={LockIcon}
                placeholder="Confirme sua senha"
                onChangeText={onChange}
                isPasswordInput
                value={value}
              />
            )}
          />
          <Text style={TYPOGRAPHY.errorText}>
            {errors && errors.confirmPassword?.message}
          </Text>
        </View>
      </View>

      <Button title="Cadastrar" onPress={handleSubmit(handleRegister)} />
      <Button title="Entrar com Google" variant="google" icon={GoogleIcon} />

      <TouchableOpacity style={styles.linkToLogin} onPress={goToLogin}>
        <Text style={TYPOGRAPHY.alertText}>
          Já possui uma conta? Vá para o login
        </Text>
      </TouchableOpacity>

    </View>
  );
}
