import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { Alert, BackHandler, Text, View } from "react-native";
import { Button } from "@/components/Atoms/Button";
import { useStartTracking } from "@/services/queries/useStartTracking";
import { useLocation } from "@/hooks/useLocation";
import { useCallback, useEffect } from "react";
import { socket } from "@/services/socket";
import { router, useFocusEffect } from "expo-router";
import { TYPOGRAPHY } from "@/constants/typography";
import { useOrderDetail } from "@/services/queries/useOrderDetail";
import { Loading } from "@/components/Atoms/Loading";
import Map from "@/components/Molecules/Map";
import { Order } from "@/@types/models/order";
import { Product } from "@/@types/models/product";
import { GoBackButton } from "@/components/Atoms/GoBackButton";
import { useOrdersStore } from "@/hooks/useOrders";

interface OrderDetailProps {
  orderId: number;
}
export function CustomerOrderDetail({ orderId }: OrderDetailProps) {
  const { isTracking } = useLocation();

  const ordersStore = useOrdersStore();
  if (!ordersStore) return null;
  const orders = ordersStore((state) => state.orders);
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return;
  }

  useEffect(() => {
    socket.emit("join_order", orderId);

    return () => {
      socket.emit("leave_order", orderId);
    };
  }, [orderId]);

  return (
    <SafeAreaView style={styles.container}>
      <GoBackButton />
      <View style={styles.mapArea}>
        <Map orderId={orderId} />
      </View>
      <View style={styles.bottomSheet}>
        <Text style={styles.orderTitle}>Pedido #{orderId}</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Entrega: </Text>
          <Text style={styles.highlightGreen}>R$ {order.orderFlee}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Total a pagar: </Text>
          <Text style={styles.highlightBlue}>R$ {order.orderAmount}</Text>
        </View>

        <View style={styles.spacer} />
      </View>
    </SafeAreaView>
  );
}
