import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { styles } from "./styles";
import { OrderIcon } from '@/components/Atoms/iconImage';
import { TYPOGRAPHY } from '@/constants/typography';

type OrderStatus = 'disponivel' | 'em rota' | 'finalizado';

interface OrderCardProps {
  title: string;
  company: string;
  status: OrderStatus;
  deliverer?: string;
  deliveryFee?: string
}

export const OrderCard: React.FC<OrderCardProps> = ({
  title,
  company,
  status,
  deliverer,
  deliveryFee
}) => {
  const isAvailable = status === 'disponivel';

  function getStatusLabel(status: string) {
    switch (status) {
      case 'disponivel':
        return 'Disponível';
      case 'em rota':
        return 'Em rota';
      case 'finalizado':
        return 'Finalizado';
      default:
        return 'Desconhecido';
    }
  }

  return (
    <View style={styles.card}>
      <OrderIcon />

      <View style={styles.content}>

        <View style={styles.infoRow}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.company}>{company}</Text>
          </View>

          {deliveryFee && (
            <Text style={TYPOGRAPHY.alertText}>Frete: {deliveryFee}</Text>
          )}
        </View>

        <View
          style={[
            styles.statusBadge,
            isAvailable ? styles.available : styles.inRoute,
          ]}
        >
          <Text style={styles.statusText}>{getStatusLabel(status)}</Text>
        </View>
      </View>
    </View>

  );
};


