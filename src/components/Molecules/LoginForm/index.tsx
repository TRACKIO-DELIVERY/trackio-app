import { Text, View } from "react-native";
import { styles } from "./styles";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormType, LoginSchema } from "./schema";

import { useAuth } from "@/hooks/useAuth";

import EmailIcon from "@/assets/icons/email.svg";
import LockIcon from "@/assets/icons/lock.svg";

import { Input } from "@/components/Atoms/Input";
import { Button } from "@/components/Atoms/Button";
import { TYPOGRAPHY } from "@/constants/typography";

export function LoginForm() {
  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(LoginSchema),
  });

  async function handleLogin(data: LoginFormType) {
    await signIn();
  }
  return (
    <View style={styles.form}>
      <View>
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
        <Text>{errors && errors.email?.message}</Text>
      </View>

      <View>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              icon={LockIcon}
              placeholder="Senha"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Text>{errors && errors.password?.message}</Text>
      </View>

      <Text style={TYPOGRAPHY.alertText}>Esqueceu a senha?</Text>

      <Button title="Enviar" onPress={handleSubmit(handleLogin)} />
    </View>
  );
}
