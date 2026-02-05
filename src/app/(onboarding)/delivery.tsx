import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { useAuth } from "@/contexts/Auth";
import { styles } from "./index";
import { Button } from "@/components/Atoms/Button";
import { Input } from "@/components/Atoms/Input";
import { GoBackButton } from "@/components/Atoms/GoBackButton";
import { InputCPFMasked } from "@/components/Atoms/inputCPF";
import { InputDateMasked } from "@/components/Atoms/InputDate";
import { EXPO_PUSH_TOKEN } from "@/utils/pushToken";
import z from "zod";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPayload } from "@/@types/api/userPayload";

export default function DeliveryOnboarding() {
  const { completeOnboarding } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DeliveryOnboardingForm>({
    resolver: zodResolver(CustomerOnboardingSchema),
    defaultValues: {
      address: {},
    },
  });

  async function onSubmit(data: DeliveryOnboardingForm) {
    if (submitting) return;

    try {
      setSubmitting(true);
      const payload: UserPayload = {
        phone: data.phone,
        cpf: data.cpf,
        dateOfBirth: data.dateOfBirth,
        address: {
          number: Number(data.address.number),
          city: data.address.city,
          neighborhood: data.address.neighborhood,
          street: data.address.street,
          zipCode: data.address.zipCode,
          state: data.address.state,
        },
        role: "DELIVERY",
        vehicleType: data.vehicleType,
        expoPushToken: EXPO_PUSH_TOKEN,
        active: true,
      };
      await completeOnboarding("DELIVERY", payload);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  function onError() {
    const firstError = Object.values(errors)[0]?.message ?? "Campos inválidos";
    Alert.alert("Erro", String(firstError));
  }

  return (
    <View style={styles.container}>
      <GoBackButton />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginTop: 80,
          flex: 1,
        }}
        contentContainerStyle={{
          gap: 12,
          marginBottom: 40,
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1, gap: 20 }}
        >
          <Text style={styles.title}>Cadastro de Entregador</Text>
          {/* CPF */}
          <Controller
            control={control}
            name="cpf"
            render={({ field: { onChange } }) => (
              <InputCPFMasked placeholder="CPF" onChangeFormatted={onChange} />
            )}
          />

          {/* Data */}
          <Controller
            control={control}
            name="dateOfBirth"
            render={({ field: { onChange } }) => (
              <InputDateMasked
                placeholder="Data nascimento (DD/MM/AAAA)"
                onChangeFormatted={onChange}
              />
            )}
          />

          {/* Telefone */}
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Telefone"
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="address.zipCode"
            render={({ field: { onChange, value } }) => (
              <Input placeholder="CEP" value={value} onChangeText={onChange} />
            )}
          />

          <Controller
            control={control}
            name="address.street"
            render={({ field: { onChange, value } }) => (
              <Input placeholder="Rua" value={value} onChangeText={onChange} />
            )}
          />

          <Controller
            control={control}
            name="address.number"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Número"
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="address.neighborhood"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Bairro"
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="address.city"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Cidade"
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="address.state"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Estado (UF)"
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="vehicleType"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Veículo (moto/carro)"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </KeyboardAvoidingView>
      </ScrollView>
      <Button
        title={submitting ? "Cadastrando..." : "Finalizar cadastro"}
        disabled={submitting}
        onPress={handleSubmit(onSubmit, onError)}
      />
    </View>
  );
}

export const CustomerOnboardingSchema = z.object({
  cpf: z.string().min(11, "CPF inválido"),
  dateOfBirth: z.string().min(8, "Data inválida"),
  phone: z.string().min(8, "Telefone inválido"),

  address: z.object({
    zipCode: z.string().min(8, "CEP inválido"),
    street: z.string().min(1, "Rua obrigatória"),
    number: z.string().min(1, "Número obrigatório"),
    neighborhood: z.string().min(1, "Bairro obrigatório"),
    city: z.string().min(1, "Cidade obrigatória"),
    state: z.string().min(2, "Estado inválido"),
  }),

  vehicleType: z.string().min(1, "Véiculo é obrigatório"),

  expoPushToken: z.string().optional(),
});

export type DeliveryOnboardingForm = z.infer<typeof CustomerOnboardingSchema>;
