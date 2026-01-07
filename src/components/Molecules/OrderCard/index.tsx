import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { Order } from "@/@types/models/order";
import { OrderIcon } from "@/components/Atoms/iconImage";

import Trash from "@/assets/icons/trash.svg";

interface Props {
  order: Order;
  onPress?: () => void;
  onRemove?: () => void;
}

export function OrderCard({ order, onPress, onRemove }: Props) {
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
        <View style={styles.footer}>
          <Text style={styles.title}>Pedido #{order.id}</Text>
          {onRemove && (
            <Trash color="rgba(182, 14, 14, 1)" onPress={onRemove} />
          )}
        </View>
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
