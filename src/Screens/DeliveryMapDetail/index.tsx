import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { Alert, BackHandler, Text, View } from "react-native";
import { Button } from "@/components/Atoms/Button";
import { useStartTracking } from "@/services/queries/useStartTracking";
import { useLocation } from "@/hooks/useLocation";
import { useCallback, useEffect, useState } from "react";
import { socket } from "@/services/socket";
import { router, useFocusEffect, useRouter } from "expo-router";
import { TYPOGRAPHY } from "@/constants/typography";
import { useOrderDetail } from "@/services/queries/useOrderDetail";
import { Loading } from "@/components/Atoms/Loading";
// import {
//   sendDeliveredOrderQueue,
//   sendInRouteOrderQueue,
// } from "@/services/queries/sendOrderToQueu";
import Map from "@/components/Molecules/Map";
import { Order } from "@/@types/models/order";
import { Product } from "@/@types/models/product";
import { GoBackButton } from "@/components/Atoms/GoBackButton";
import DeliveryMap from "@/components/Molecules/DeliveryMap";
import { useDeliveryOrdersStore } from "@/storage/deliverOrders";
import { ActiveOrderCard } from "./ActiveOrderCard";
import { NextOrdersList } from "./NextOrderList";
import { useCompleteOrderDeliver } from "@/services/queries/useCompleteOrderDeliver";

interface DeliveryMapDetailProps {
  orders: Order[];
  activeOrder: number;
}
export function DeliveryMapDetail({
  orders,
  activeOrder,
}: DeliveryMapDetailProps) {
  const { startGetPositions, stopTracking, isTracking } = useLocation();
  const [activeOrderId, setActiveOrderId] = useState(activeOrder);
  const clearDeliveries = useDeliveryOrdersStore(
    (state) => state.clearDeliveries,
  );
  const { mutate } = useCompleteOrderDeliver();

  const activeOrderData = orders.find((o) => o.id === activeOrderId);
  const nextOrders = orders.filter((o) => o.id !== activeOrderId);

  useEffect(() => {
    orders.forEach((order) => socket.emit("join_order", order.id));
    return () => {
      orders.forEach((order) => socket.emit("leave_order", order.id));
    };
  }, [orders]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (isTracking) {
          Alert.alert(
            "Rota em andamento",
            "Finalize ou pause a rota antes de sair.",
            [{ text: "OK", style: "cancel" }],
          );
          return true;
        }
        return false;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress,
      );
      return () => backHandler.remove();
    }, [isTracking]),
  );

  function goBack() {
    router.replace("/(deliver)/(tabs)/deliveries");
  }

  function handleFinishOrder(order: Order) {
    Alert.alert(
      "Finalizar entrega",
      `Confirmar entrega do pedido #${order.id}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          onPress: () => {
            socket.emit("order_delivered", order.id);
            mutate({ orderId: activeOrder });
            const next = nextOrders[0];
            if (next) {
              setActiveOrderId(next.id);
            } else {
              stopTracking();
              clearDeliveries();
              router.replace("/(deliver)/(tabs)/deliveries");
            }
          },
        },
      ],
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <GoBackButton onPress={goBack} />

      <View style={styles.mapArea}>
        <DeliveryMap orders={orders} />
      </View>

      <View style={styles.bottomSheet}>
        <Text style={styles.orderTitle}>Pedidos em rota ({orders.length})</Text>

        {activeOrderData && <ActiveOrderCard order={activeOrderData} />}

        <Button
          title={isTracking ? "Pausar rota" : "Iniciar rota"}
          variant="secondary"
          onPress={isTracking ? stopTracking : () => startGetPositions(orders)}
        />

        <Button
          title="Finalizar entrega"
          onPress={() => handleFinishOrder(activeOrderData!)}
          disabled={!isTracking || !activeOrderData}
        />

        {nextOrders.length > 0 && <NextOrdersList orders={nextOrders} />}

        <View style={styles.spacer} />
      </View>
    </SafeAreaView>
  );
}
