import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { styles } from "./styles";
import { OrderIcon } from '@/components/Atoms/iconImage';

type OrderStatus = 'disponivel' | 'em rota';

interface OrderCardProps {
  title: string;
  company: string;
  status: OrderStatus;
  deliverer?: string;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  title,
  company,
  status,
  deliverer,
}) => {
  const isAvailable = status === 'disponivel';

  return (
    <View style={styles.card}>
      <OrderIcon />

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.company}>{company}</Text>

        <View
          style={[
            styles.statusBadge,
            isAvailable ? styles.available : styles.inRoute,
          ]}
        >
          <Text style={styles.statusText}>
            {isAvailable ? 'Disponível' : 'Em rota'}
          </Text>
        </View>

        <View style={styles.delivererWrapper}>
          {!isAvailable && deliverer ? (
            <Text style={styles.delivererText}>
              Sendo entregue por {deliverer}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
};


