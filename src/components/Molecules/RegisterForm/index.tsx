import { Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormType, RegisterSchema } from "./schema";

import { useAuth } from "@/hooks/useAuth";

import EmailIcon from "@/assets/icons/email.svg";
import UserIcon from "@/assets/icons/user.svg";
import LockIcon from "@/assets/icons/lock.svg";
import GoogleIcon from "@/assets/icons/google.svg";
import CardIcon from "@/assets/icons/card.svg";
import CalendarIcon from "@/assets/icons/calendar.svg";

import { styles } from "./styles";
import { Input } from "@/components/Atoms/Input";
import { Button } from "@/components/Atoms/Button";
import { TYPOGRAPHY } from "@/constants/typography";
import { RegisterParams } from "@/services/queries/useRegister";

import { InputDateMasked } from "@/components/Atoms/InputDate";
import { InputCPFMasked } from "@/components/Atoms/inputCPF";

export function RegisterForm() {
  const { register } = useAuth();

  const [nextForm, setNextForm] = useState(false)
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterSchema),
  });

  function handleRegister(data: RegisterFormType) {
    const user: RegisterParams = {
      user: {
        name: data.fullname,
        username: data.username,
        password: data.password,
        email: data.email,
        bith_date: data.birthDate,
        user_type: 3,
        cpf: data.cpf,
      },
      availability: "true",
      license_plate: data.plate,
      vehicle: data.vehicle,
    }
    register(user);
  }

  async function goToNextForm() {
    const isValid = await trigger(['fullname', 'username', 'email', 'birthDate', 'cpf'])
    if (isValid) setNextForm(true)
  }

  function goToLogin() {
    router.push("/login");
  }
  return (
    <View style={styles.form}>
      {
        nextForm && (
          <TouchableOpacity onPress={() => setNextForm(false)}>
            <Text style={TYPOGRAPHY.bodyText}> Voltar</Text>
          </TouchableOpacity>
        )
      }
      <View style={styles.inputsContainer}>
        {
          !nextForm && (
            <>
              {/*Nome */}
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

              {/*Username */}
              <View style={styles.inputView}>
                <Controller
                  control={control}
                  name="username"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      icon={LockIcon}
                      placeholder="Username"
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                <Text style={TYPOGRAPHY.errorText}>
                  {errors && errors.username?.message}
                </Text>
              </View>

              {/*Email */}
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

              {/*Data de nascimento */}
              <View style={styles.inputView}>
                <Controller
                  control={control}
                  name="birthDate"
                  render={({ field: { onChange, value } }) => (
                    <InputDateMasked
                      icon={CalendarIcon}
                      placeholder="Data de nascimento"
                      onChangeFormatted={onChange}
                    />
                  )}
                />
                <Text style={TYPOGRAPHY.errorText}>
                  {errors && errors.birthDate?.message}
                </Text>
              </View>

              {/*CPF */}
              <View style={styles.inputView}>
                <Controller
                  control={control}
                  name="cpf"
                  render={({ field: { onChange, value } }) => (
                    <InputCPFMasked
                      icon={CardIcon}
                      placeholder="CPF"
                      onChangeFormatted={onChange}
                    />
                  )}
                />
                <Text style={TYPOGRAPHY.errorText}>
                  {errors && errors.cpf?.message}
                </Text>
              </View>
            </>
          )}

        {
          nextForm && (
            <>
              {/*Vehicle */}
              <View style={styles.inputView}>
                <Controller
                  control={control}
                  name="vehicle"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      icon={LockIcon}
                      placeholder="Veículo"
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                <Text style={TYPOGRAPHY.errorText}>
                  {errors && errors.username?.message}
                </Text>
              </View>


              {/*Plate */}
              <View style={styles.inputView}>
                <Controller
                  control={control}
                  name="plate"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      icon={LockIcon}
                      placeholder="Placa do seu veículo"
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                <Text style={TYPOGRAPHY.errorText}>
                  {errors && errors.plate?.message}
                </Text>
              </View>

              {/*Senha */}
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

              {/*Confirmar senha */}
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
            </>
          )
        }

      </View>

      {
        nextForm ? (
          <Button title="Cadastrar" onPress={handleSubmit(handleRegister)} />
        ) : (

          <Button title="Próximo" onPress={goToNextForm} />

        )
      }

      <Button title="Entrar com Google" variant="google" icon={GoogleIcon} />

      <TouchableOpacity style={styles.linkToLogin} onPress={goToLogin}>
        <Text style={TYPOGRAPHY.alertText}>
          Já possui uma conta? Vá para o login
        </Text>
      </TouchableOpacity>

    </View>
  );
}
