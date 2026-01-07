import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { useNavigation, useRouter } from "expo-router";
import { useCustomerOrdersStore } from "@/storage/orders";
import { Order } from "@/@types/models/order";

export function CustomerOrders() {
  const orders = useCustomerOrdersStore((state) => state.orders);

  const navigation = useRouter();

  function renderItem({ item }: { item: Order }) {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          navigation.push("/(customer)/order/97");
        }}
      >
        <View style={styles.row}>
          <Text style={styles.label}>Pedido #{item.id.toString()}</Text>
          <Text style={styles.status}>{translateStatus(item)}</Text>
        </View>

        <Text style={styles.date}>{"data"}</Text>

        <View style={styles.row}>
          <Text style={styles.total}>Total:</Text>
          <Text style={styles.totalValue}>
            R$ {item.orderAmount?.toFixed(2)}
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

function translateStatus(status: Order) {
  switch (status.orderStatus) {
    case 0:
      return "Preparando";
    case 1:
      return "A caminho";
    case 2:
      return "Entregue";
    default:
      return "Status";
  }
}
