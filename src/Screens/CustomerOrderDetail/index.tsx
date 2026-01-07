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
// import {
//   sendDeliveredOrderQueue,
//   sendInRouteOrderQueue,
// } from "@/services/queries/sendOrderToQueu";
import Map from "@/components/Molecules/Map";
import { Order } from "@/@types/models/order";
import { Product } from "@/@types/models/product";
import { GoBackButton } from "@/components/Atoms/GoBackButton";

interface OrderDetailProps {
  orderId: string;
}
export function CustomerOrderDetail({ orderId }: OrderDetailProps) {
  //const { data, isFetching, error } = useOrderDetail(orderId);

  //const { mutate: sendInRouteOrder } = sendInRouteOrderQueue();
  //const { mutate: sendDeliveredOrder } = sendDeliveredOrderQueue();

  //const { mutate: startRoute } = useStartTracking();
  const { startGetPositions, stopTracking, isTracking } = useLocation();

  const data: Order = {
    customerId: 1,
    orderDate: new Date(),
    deliveryPersonId: 1,
    id: 1,
    items: [
      {
        productId: 1,
        productName: "lala",
        quantity: 2,
        unitPrice: 12.0,
      },
    ],
    orderStatus: 1,
    orderAmount: 12,
    companyId: 1,
    companyName: "teste",
    customerName: "karen",
    orderFlee: 7.0,
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

  // if (error) {
  //   console.log(error);
  //   return (
  //     <View>
  //       <Text> Não foi possível carregar pedidos, desculpe!</Text>
  //     </View>
  //   );
  // }

  // if (isFetching) {
  //   return <Loading />;
  // }

  function startTrackingRoute() {
    // startRoute(orderId, {
    //   onSuccess: (data) => {
    //     const orderToQueue = {
    //       order_id: orderId,
    //       order_status: 2,
    //     };
    //     if (data.canStartSendingLocation) {
    //       //sendInRouteOrder(orderToQueue);
    //       startGetPositions(orderId);
    //     }
    //   },
    //   onError: (error) => {
    //     console.error("Unable to start route", error);
    //   },
    // });
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
          const orderToQueue = {
            order_id: orderId,
            order_status: 3,
          };
          //sendDeliveredOrder(orderToQueue);
          router.push("/(deliver)/(tabs)/deliveries");
        },
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <GoBackButton />
      <View style={styles.mapArea}>
        <Map orderId={orderId} />
      </View>
      <View style={styles.bottomSheet}>
        <Text style={styles.orderTitle}>Pedido #{orderId}</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Tempo estimado da sua entrega: </Text>
          <Text style={styles.highlightRed}>10 minutos</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Entrega: </Text>
          <Text style={styles.highlightGreen}>{data.orderFlee}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Total a pagar: </Text>
          <Text style={styles.highlightBlue}>R$ {data.orderAmount}</Text>
        </View>

        <View style={styles.spacer} />
      </View>
    </SafeAreaView>
  );
}
