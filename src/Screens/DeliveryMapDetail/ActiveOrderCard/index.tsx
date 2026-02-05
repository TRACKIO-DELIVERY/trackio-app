import { Order } from "@/@types/models/order";
import { Text, View } from "react-native";
import { styles } from "./styles";

export function ActiveOrderCard({ order }: { order: Order }) {
  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Pedido ativo </Text>
        <Text style={styles.orderId}>- #{order.id} - </Text>
        <Text style={styles.text}>
          Cliente: <Text style={styles.highlight}>{order.customerName}</Text>
        </Text>
      </View>
    </View>
  );
}
