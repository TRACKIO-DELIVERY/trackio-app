import React from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import { styles } from "./styles";
import { GoBackButton } from "@/components/Atoms/GoBackButton";
import { Order } from "@/@types/models/order";

interface DeliveryOrderDetailProps {
  order: Order;
  onAccept?: () => void;
  onStartRoute?: () => void;
}

export const DeliveryOrderDetail: React.FC<DeliveryOrderDetailProps> = ({
  order,
  onAccept,
  onStartRoute,
}) => {
  const renderProduct = ({ item }: any) => (
    <View style={styles.productRow}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productQty}>x{item.quantity}</Text>
      <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <GoBackButton />

      <Text style={styles.title}>Pedido #{order.id}</Text>
      <Text style={styles.company}>Empresa: {order.companyId}</Text>
      <Text style={styles.date}>
        {new Date(order.date).toLocaleDateString()}
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Endereço de Entrega</Text>
        <Text style={styles.address}>Rua Lorem Ipsum, 123 - Centro</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Produtos</Text>

        <FlatList
          data={order.procucts}
          renderItem={renderProduct}
          keyExtractor={(item) => String(item.id)}
        />
      </View>

      <View style={styles.totalBox}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>R$ {order.total.toFixed(2)}</Text>
      </View>

      {order.status === 0 && (
        <Pressable style={styles.buttonPrimary} onPress={onAccept}>
          <Text style={styles.buttonText}>Aceitar Entrega</Text>
        </Pressable>
      )}
    </View>
  );
};
