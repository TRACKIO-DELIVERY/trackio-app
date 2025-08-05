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
import { sendDeliveredOrderQueue, sendInRouteOrderQueue } from "@/services/queries/sendOrderToQueu";

interface OrderDetailProps {
    orderId: string
}
export function OrderDetail({ orderId }: OrderDetailProps) {

    const { data, isFetching, error } = useOrderDetail(orderId)

    const { mutate: sendInRouteOrder } = sendInRouteOrderQueue()
    const { mutate: sendDeliveredOrder } = sendDeliveredOrderQueue()

    const { mutate: startRoute } = useStartTracking()
    const { location, startGetPositions, stopTracking, isTracking } = useLocation()


    useEffect(() => {

        if (!socket.connected) {
            socket.connect()
        }
        console.log("Conectado ao socket")

        socket.emit("join_order", orderId);

        return () => {
            socket.disconnect()
            console.log("desconectado")
        }
    }, [])

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
                return false
            }


            const backHandler = BackHandler.addEventListener("hardwareBackPress", onBackPress);
            return () => backHandler.remove()
        }, [isTracking])
    )

    if (error) {
        console.log(error)
        return (
            <View>
                <Text> Não foi possível carregar pedidos, desculpe!</Text>
            </View>
        )
    }

    if (isFetching) {
        return (
            <Loading />
        )
    }
    function startTrackingRoute() {
        startRoute(orderId, {
            onSuccess: (data) => {
                const orderToQueue = {
                    order_id: orderId,
                    order_status: 2
                }
                if (data.canStartSendingLocation) {
                    sendInRouteOrder(orderToQueue)
                    startGetPositions(orderId)
                }
            },
            onError: (error) => {
                console.error("Unable to start route", error);
            }
        })
    }

    function finishRoute() {

        Alert.alert(
            "Encerrar rota",
            "Deseja encerrar?", [
            {
                text: 'Cancelar',
                onPress: () => { },
                style: 'cancel'
            },
            {
                text: "OK",
                onPress: () => {

                    stopTracking()
                    const orderToQueue = {
                        order_id: orderId,
                        order_status: 3
                    }
                    sendDeliveredOrder(orderToQueue)
                    router.push('/(tabs)/deliveries')
                }
            }
        ])
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* <TouchableOpacity style={styles.goBack} onPress={router.back}>
                <Arrow width={20} height={20} />
                <Text style={TYPOGRAPHY.bodyText}> Voltar</Text>
            </TouchableOpacity> */}

            <View style={styles.headerCard}>
                <Text style={TYPOGRAPHY.title}>Pedido #{orderId}</Text>
                <Text style={TYPOGRAPHY.bodyText}>{data?.email || 'cliente'}</Text>
                <Text style={TYPOGRAPHY.bodyText}>{data?.establishment || 'empresa'}</Text>
                <Text style={TYPOGRAPHY.bodyText}>{data?.id || 'endereço'} ➔ {data?.id || 'endereço final'}</Text>
            </View>

            <View style={styles.mapArea}>
                <Text style={styles.mapText}>[ Mapa será renderizado aqui ]</Text>
            </View>

            <View style={styles.buttonGroup}>

                {isTracking ? (
                    <Button
                        title="Finalizar rota"
                        variant="danger"
                        onPress={finishRoute}
                    />

                ) : (
                    <Button title="Iniciar rota" onPress={startTrackingRoute} />

                )}
            </View>

        </SafeAreaView >

    )
}