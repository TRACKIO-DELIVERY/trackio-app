import { Order } from "@/@types/models/order";
import { styles } from "./styles";
import { Text, View } from "react-native";

export function NextOrdersList({ orders }: { orders: Order[] }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Próximos pedidos</Text>

      {orders.map((order) => (
        <Text key={order.id} style={styles.item}>
          • #{order.id} — {order.customerName ?? "Cliente"}
        </Text>
      ))}
    </View>
  );
}
