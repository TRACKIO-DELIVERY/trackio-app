import React from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";
import { styles } from "./styles";
import { GoBackButton } from "@/components/Atoms/GoBackButton";
import { Order, OrderItem } from "@/@types/models/order";
import { useRouter } from "expo-router";
import { Button } from "@/components/Atoms/Button";
import { useAcceptOrder } from "@/services/queries/useAcceptOrder";
import { useAuth } from "@/contexts/Auth";
import { Loading } from "@/components/Atoms/Loading";
import { useDeliveriesStore } from "@/hooks/useDeliveries";

interface DeliveryOrderDetailProps {
  order: Order;
}

export const DeliveryOrderDetail: React.FC<DeliveryOrderDetailProps> = ({
  order,
}) => {
  const { user } = useAuth();

  const deliveriesStore = useDeliveriesStore();
  if (!deliveriesStore) return null;
  const accepetOrderStore = deliveriesStore((state) => state.accepetOrder);
  const { mutate } = useAcceptOrder(order.id);
  const navigation = useRouter();

  async function handleAcceptOrder() {
    try {
      // 1. Enviar http POST para order service
      mutate(
        { deliveryId: user?.userId!, orderId: order.id },
        {
          onSuccess: () => {
            // 2. salvar no order storage do entragor
            accepetOrderStore(order);
            // 3. enviar push notification para cliente
            // 4. redirecionar para listagem de entrgas
            navigation.push("/(deliver)/(tabs)/deliveries");
          },
          onError: (err) => {
            console.log(err.message);
            Alert.alert("Não foi possível aceitar esse pedido");
          },
        },
      );
    } catch (error) {
      console.log(error);
      throw new Error("Unable to accept order");
    }
  }

  const renderProduct = ({ item }: { item: OrderItem }) => (
    <View style={styles.productRow}>
      <Text style={styles.productName}>{item.productName}</Text>
      <Text style={styles.productQty}>x{item.quantity}</Text>
    </View>
  );

  return (
    <View style={styles.safe}>
      <GoBackButton />

      <Text style={styles.title}>Pedido #{order.id}</Text>
      <Text style={styles.company}>Empresa: {order.companyId}</Text>
      <Text style={styles.date}>
        {new Date(order.orderDate).toLocaleDateString()}
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Endereço de Entrega</Text>
        <Text style={styles.address}>Rua Gerson, 10 - Chico caja</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Produtos</Text>

        <FlatList
          data={order.items}
          renderItem={renderProduct}
          keyExtractor={(item) => String(item.productId)}
        />
      </View>

      <View style={styles.totalBox}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>R$ {order.orderAmount}</Text>
      </View>

      {order.orderStatus === "IN_PROGRESS" && (
        <Button title="Aceitar entrega" onPress={handleAcceptOrder} />
      )}
    </View>
  );
};
