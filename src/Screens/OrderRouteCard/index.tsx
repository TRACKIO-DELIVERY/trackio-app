import { View, Text } from "react-native";
import { Button } from "@/components/Atoms/Button";
import { styles } from "./syles";
import { Order } from "@/@types/models/order";

interface Props {
  order: Order;
  onFinish(): void;
}

export function OrderRouteCard({ order, onFinish }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>📦 Pedido #{order.id}</Text>
      </View>

      <Button title="Finalizar entrega" onPress={onFinish} />
    </View>
  );
}
