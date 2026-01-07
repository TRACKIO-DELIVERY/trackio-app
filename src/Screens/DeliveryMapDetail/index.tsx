import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { Alert, BackHandler, Text, View } from "react-native";
import { Button } from "@/components/Atoms/Button";
import { useStartTracking } from "@/services/queries/useStartTracking";
import { useLocation } from "@/hooks/useLocation";
import { useCallback, useEffect } from "react";
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

interface DeliveryMapDetailProps {
  orderId: string;
}
export function DeliveryMapDetail({ orderId }: DeliveryMapDetailProps) {
  const { startGetPositions, stopTracking, isTracking } = useLocation();
  const clearDeliveries = useDeliveryOrdersStore(
    (state) => state.clearDeliveries
  );
  const navigation = useRouter();

  const data: Order = {
    customerId: 1,
    date: new Date(),
    deliveryPersonId: 1,
    id: 1,
    procucts: [],
    status: 1,
    total: 12,
    companyId: 1,
  };

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    console.log("Conectado ao socket");

    socket.emit("join_order", orderId);

    return () => {
      socket.disconnect();
      console.log("desconectado");
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (isTracking) {
          Alert.alert(
            "Rota em andamento",
            "Você precisa finalizar a rota antes de sair.",
            [{ text: "OK", style: "cancel" }]
          );
          return true;
        }
        return false;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      return () => backHandler.remove();
    }, [isTracking])
  );

  function goBack() {
    router.replace("/(deliver)/deliveries");
  }
  function finishRoute() {
    Alert.alert("Encerrar rota", "Deseja encerrar?", [
      {
        text: "Cancelar",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          stopTracking();
          socket.emit("join_order", orderId);
          socket.disconnect();
          console.log("desconectado");
          clearDeliveries();
          router.push("/(deliver)/deliveries");
        },
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <GoBackButton onPress={goBack} />
      <View style={styles.mapArea}>
        <DeliveryMap orders={[]} />
      </View>
      <View style={styles.bottomSheet}>
        <Text style={styles.orderTitle}>Pedidos em rota</Text>

        <Button
          title={isTracking ? "Pausar" : "Iniciar"}
          onPress={isTracking ? stopTracking : () => startGetPositions("1")}
        />
        <Button
          title="Finalizar rota"
          onPress={finishRoute}
          variant="secondary"
        />
        <View style={styles.spacer} />
      </View>
    </SafeAreaView>
  );
}
