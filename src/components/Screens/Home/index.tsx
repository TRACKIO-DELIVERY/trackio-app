import { OrdersList } from "@/components/Molecules/OrdersList";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { socket } from "@/services/socket";
import { Button } from "@/components/Atoms/Button";
import { useEffect } from "react";
import { useAcceptOrder } from "@/services/queries/useAcceptOrder";
import { useLocation } from "@/hooks/useLocation";
import { Text } from "react-native";
import { useStartTracking } from "@/services/queries/useStartTracking";

export function Home() {
    const { location, startGetPositions, stopTracking } = useLocation()
    //lembrar q tudo isso tera q ser feito na tela de detaljes do pedido, para
    //de fato pegar o id
    const { mutate: startTrackingRoute, error, data, isSuccess } = useStartTracking("1")
    useEffect(() => {
        function onConnect() {
            socket.emit("join_order", { orderId: "1" });
        };

        if (!socket.connected) {
            socket.connect()
        }

        console.log("Conectado ao socket")
        socket.on("connect", onConnect)

        return () => {
            socket.off("connect", onConnect);
        }
    }, [])

    function Emit() {
        socket.emit("location_update", {
            orderId: "1",
            coords: { latitude: -6.14, longitude: -38.20 },
        });
    }

    async function startRoute() {

        startTrackingRoute(undefined, {
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
    return (
        <SafeAreaView style={styles.container}>


            <Button onPress={Emit} />
            <Button title="Start" onPress={startRoute} />
            <Button title="stop" onPress={stopTracking} />

        </SafeAreaView>
    )
}