import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/Atoms/Header";
import { styles } from "./styles";
import { OrderCard } from "@/components/Molecules/OrderCard";
import { TYPOGRAPHY } from "@/constants/typography";
import { useAuth } from "@/hooks/useAuth";
import { useDeliveryOrdersStore } from "@/storage/deliverOrders";
import { Button } from "@/components/Atoms/Button";
import { useRouter } from "expo-router";
import { DeliveryMapDetail } from "../DeliveryMapDetail";
import { useState } from "react";
import { THEME } from "@/constants/theme";
import { useCancelOrder } from "@/services/queries/useCancelOrder";

export function Deliveries() {
  const { user } = useAuth();
  const orders = useDeliveryOrdersStore((state) => state.orders);
  const cancelOrder = useDeliveryOrdersStore((state) => state.cancelOrder);
  const { mutate } = useCancelOrder();
  const navigation = useRouter();

  function handleStartRoute() {
    navigation.push("/(deliver)/deliveryMap");
  }
  function handleCancelOrder(orderId: number) {
    Alert.alert(
      "Cancelar pedido",
      `Deseja realmente cancelar o pedido ${orderId}`,
      [
        {
          text: "Sim",
          onPress: () => {
            mutate(
              { orderId: orderId },
              {
                onSuccess: () => {
                  cancelOrder(orderId);
                },
                onError: () => {
                  Alert.alert("Não foi possível cancelar esse pedido");
                },
              },
            );
          },
        },
        {
          text: "Não",
          style: "cancel",
        },
      ],
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header role="entregador" name={user?.username || "Entregador(a)"} />
      <View style={styles.orders}>
        <View style={styles.heading}>
          <Text style={[TYPOGRAPHY.title]}>Pedidos Aceitos</Text>
          <Text style={TYPOGRAPHY.subtitle}>
            Começa a rota dos seus pedidos aqui!
          </Text>
        </View>
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            gap: 12,
          }}
          renderItem={({ item }) => (
            <OrderCard
              order={item}
              onRemove={() => handleCancelOrder(item.id)}
            />
          )}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                marginTop: 50,
                marginHorizontal: 30,
                alignItems: "center",
              }}
            >
              <Text style={[TYPOGRAPHY.alertText, { textAlign: "center" }]}>
                Sem pedidos para entregar no momento. Acesse HOME, para escolher
                pedidos disponíveis
              </Text>
            </View>
          )}
        />

        {/*enviar para tela do mapa, enviar os pedidos */}
        {orders.length > 0 && (
          <Button title="Iniciar rota" onPress={handleStartRoute} />
        )}
      </View>
    </SafeAreaView>
  );
}
