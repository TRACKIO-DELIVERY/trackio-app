import React from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { styles } from "./styles";
import { useRouter } from "expo-router";

import { Order } from "@/@types/models/order";
import { translateStatus } from "@/utils/orderUtils";

import Trash from "@/assets/icons/trash.svg";
import { THEME } from "@/constants/theme";
import { useCancelOrder } from "@/services/queries/useCancelOrder";
import { useOrdersStore } from "@/hooks/useOrders";

export function CustomerOrders() {
  const ordersStore = useOrdersStore();
  if (!ordersStore) return null;
  const orders = ordersStore((state) => state.orders);

  const cancelOrder = ordersStore((state) => state.cancelOrder);
  const { mutate } = useCancelOrder();
  const navigation = useRouter();

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

  function renderItem({ item }: { item: Order }) {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          navigation.push(`/(customer)/order/${item.id}`);
        }}
      >
        <View style={styles.row}>
          <Text style={styles.label}>Pedido #{item.id}</Text>
          <Trash
            color={THEME.red[500]}
            onPress={() => handleCancelOrder(item.id)}
          />
        </View>
        <Text style={styles.status}>{translateStatus(item.orderStatus)}</Text>
        <View style={styles.row}>
          <Text style={styles.total}>Total:</Text>
          <Text style={styles.totalValue}>
            R$ {item.orderAmount.toFixed(2)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Pedidos</Text>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
