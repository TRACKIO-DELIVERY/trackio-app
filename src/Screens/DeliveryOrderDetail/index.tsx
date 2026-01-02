import React from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import { styles } from "./styles";
import { GoBackButton } from "@/components/Atoms/GoBackButton";
import { Order } from "@/@types/models/order";
import { useDeliveryOrdersStore } from "@/storage/deliverOrders";
import { useRouter } from "expo-router";

interface DeliveryOrderDetailProps {
  order: Order;
}

export const DeliveryOrderDetail: React.FC<DeliveryOrderDetailProps> = ({
  order,
}) => {
  const accepetOrder = useDeliveryOrdersStore((state) => state.accepetOrder);
  const navigation = useRouter();

  async function handleAcceptOrder() {
    try {
      // 1. Enviar http POST para order service
      // 2. salvar no order storage do entragor
      accepetOrder(order);
      // 3. enviar push notification para cliente
      // 4. redirecionar para listagem de entrgas
      navigation.push("/(deliver)/deliveries");
    } catch (error) {
      console.log(error);
      throw new Error("Unable to accept order");
    }
  }

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
        <Pressable style={styles.buttonPrimary} onPress={handleAcceptOrder}>
          <Text style={styles.buttonText}>Aceitar Entrega</Text>
        </Pressable>
      )}
    </View>
  );
};
