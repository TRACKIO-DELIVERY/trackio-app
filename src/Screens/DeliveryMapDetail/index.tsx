import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { Alert, BackHandler, Text, View } from "react-native";
import { Button } from "@/components/Atoms/Button";
import { useLocation } from "@/hooks/useLocation";
import { useCallback, useEffect, useState } from "react";
import { socket } from "@/services/socket";
import { router, useFocusEffect, useRouter } from "expo-router";
import { Order } from "@/@types/models/order";
import { GoBackButton } from "@/components/Atoms/GoBackButton";
import DeliveryMap from "@/components/Molecules/DeliveryMap";
import { ActiveOrderCard } from "./ActiveOrderCard";
import { NextOrdersList } from "./NextOrderList";
import { useCompleteOrderDeliver } from "@/services/queries/useCompleteOrderDeliver";
import { useDeliveriesStore } from "@/hooks/useDeliveries";

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

  const deliveriesStore = useDeliveriesStore();
  if (!deliveriesStore) return null;
  const clearDeliveries = deliveriesStore((state) => state.clearDeliveries);
  const { mutate } = useCompleteOrderDeliver();

  const activeOrderData = orders.find((o) => o.id === activeOrderId);

  if (!activeOrderData && orders.length > 0) {
    // Tenta pegar o primeiro se o ID ativo sumiu do array
    setActiveOrderId(orders[0].id);
  }

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
            mutate(
              { orderId: activeOrder },
              {
                onSuccess: () => {
                  const next = nextOrders[0];
                  if (next) {
                    setActiveOrderId(next.id);
                  } else {
                    stopTracking();
                    clearDeliveries();
                    router.push("/");
                  }
                },
                onError: () => {
                  Alert.alert("Não foi possível encerrar o pedido");
                },
              },
            );
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
