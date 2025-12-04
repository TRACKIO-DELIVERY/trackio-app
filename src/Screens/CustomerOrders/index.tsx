import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "expo-router";
import { useCustomerOrders } from "@/storage/orders";
import { Order } from "@/@types/models/order";

export function CustomerOrders() {
  const orders = useCustomerOrders((state) => state.orders);

  const navigation = useNavigation();

  function renderItem({ item }: { item: Order }) {
    return (
      <TouchableOpacity style={styles.card} onPress={() => {}}>
        <View style={styles.row}>
          <Text style={styles.label}>Pedido #{item.id.toString()}</Text>
          <Text style={styles.status}>{translateStatus(item)}</Text>
        </View>

        <Text style={styles.date}>{item.date.getDate()}</Text>

        <View style={styles.row}>
          <Text style={styles.total}>Total:</Text>
          <Text style={styles.totalValue}>R$ {item.total?.toFixed(2)}</Text>
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
  switch (status.status.toString()) {
    case "preparing":
      return "Preparando";
    case "on_the_way":
      return "A caminho";
    case "delivered":
      return "Entregue";
    default:
      return "Status";
  }
}
