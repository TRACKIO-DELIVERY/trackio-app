import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { Text, TouchableOpacity, View } from "react-native";
import { Button } from "@/components/Atoms/Button";
import { useStartTracking } from "@/services/queries/useStartTracking";
import { useLocation } from "@/hooks/useLocation";
import { useEffect } from "react";
import { socket } from "@/services/socket";
import { OrderDTO } from "@/dtos/orderDTO";
import { router } from "expo-router";
import { TYPOGRAPHY } from "@/constants/typography";
import Arrow from "@/assets/icons/arrow.svg"

interface OrderDetailProps {
    orderId: string
    order?: OrderDTO
}
export function OrderDetail({ orderId, order }: OrderDetailProps) {

    const { mutate: startRoute } = useStartTracking(orderId)
    const { location, startGetPositions, stopTracking } = useLocation()

    useEffect(() => {

        if (!socket.connected) {
            socket.connect()
        }
        console.log("Conectado ao socket")

        socket.emit("join_order", orderId);

        socket.emit("route_ready", { orderId: "1", de: "2" })

        return () => {
            socket.disconnect()
            console.log("desconectado")
        }
    }, [])

    function startTrackingRoute() {
        startRoute(undefined, {
            onSuccess: (data) => {
                console.log(data.canStartSendingLocation)
                if (data.canStartSendingLocation) {
                    startGetPositions("1")
                }
            },
            onError: (error) => {
                console.error("Unable to start route", error);
            }
        })
    }

    function finishRoute() {
        stopTracking()
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.goBack} onPress={router.back}>
                <Arrow width={20} height={20} />
                <Text style={TYPOGRAPHY.bodyText}> Voltar</Text>
            </TouchableOpacity>

            <View style={styles.headerCard}>
                <Text style={TYPOGRAPHY.title}>Pedido #{orderId}</Text>
                <Text style={TYPOGRAPHY.bodyText}>{order?.email || 'cliente'}</Text>
                <Text style={TYPOGRAPHY.bodyText}>{order?.establishment.name || 'empresa'}</Text>
                <Text style={TYPOGRAPHY.bodyText}>{order?.id || 'endereço'} ➔ {order?.id || 'endereço final'}</Text>
            </View>

            <View style={styles.mapArea}>
                <Text style={styles.mapText}>[ Mapa será renderizado aqui ]</Text>
            </View>

            <View style={styles.buttonGroup}>
                <Button title="Iniciar rota" onPress={startTrackingRoute} />
                <Button
                    title="Finalizar rota"
                    variant="danger"
                    onPress={finishRoute}
                />
            </View>

        </SafeAreaView >

    )
}