import React from "react";
import { View, Text } from "react-native";
import { OrderIcon } from "@/components/Atoms/iconImage";
import { styles } from "./styles";

interface OrderCardProps {
  title: string;
  company: number;
  status: number;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  title,
  company,
  status,
}) => {
  function getStatusLabel() {
    switch (status) {
      case 1:
        return "Disponível";
      case 2:
        return "Em rota";
      case 3:
        return "Finalizado";
      default:
        return "Desconhecido";
    }
  }

  return (
    <View style={styles.card}>
      <View style={styles.iconWrapper}>
        <OrderIcon />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.company}>{company}</Text>

        {/* <Text style={styles.address} numberOfLines={1} ellipsizeMode="tail">
          {deliveryAddress}
        </Text>

        <View style={styles.footerRow}>
          {deliveryFee && (
            <Text style={styles.deliveryFee}>Frete: {deliveryFee}</Text>
          )}
          <View style={[styles.statusBadge, styles[`status${status}`]]}>
            <Text style={styles.statusText}>{getStatusLabel()}</Text>
          </View>
        </View> */}
      </View>
    </View>
  );
};
