import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { Order } from "@/@types/models/order";
import { OrderIcon } from "@/components/Atoms/iconImage";

interface Props {
  order: Order;
  onPress?: () => void;
}

export function OrderCard({ order, onPress }: Props) {
  function getStatusLabel() {
    switch (order.status) {
      case 0:
        return "Disponível";
      case 1:
        return "Disponível";
      case 2:
        return "Entregue";
      default:
        return "Desconhecido";
    }
  }

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.iconWrapper}>
        <OrderIcon />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Pedido #{order.id}</Text>
        <Text style={styles.company}>Empresa: {order.companyId}</Text>

        <View style={styles.footer}>
          <Text style={styles.total}>Entrega: R$ 7.00</Text>

          <View style={[styles.statusBadge, styles[`status_${order.status}`]]}>
            <Text style={styles.statusText}>{getStatusLabel()}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
