import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { Button } from "@/components/Atoms/Button";
import { router } from "expo-router";
import { Header } from "@/components/Atoms/Header";
import { useState } from "react";
import { AcceptOrderModal } from "@/components/Molecules/AcceptOrderModal";
import { useAcceptOrder } from "@/services/queries/useAcceptOrder";
import { OrdersList } from "@/components/Molecules/OrdersList";
import { Text, View } from "react-native";
import { TYPOGRAPHY } from "@/constants/typography";
import { THEME } from "@/constants/theme";

export function Home() {
    const [showAceptOrderModal, setShowAceptOrderModal] = useState(false)

    function handleAcceptOrder(orderId: string) {
        //const { mutate: AceptOrder, data } = useAcceptOrder(orderId)

        // AceptOrder(undefined, {
        //     onSuccess: (() => {
        //         router.push(`/(tabs)/order/${orderId}`)
        //         setShowAceptOrderModal(false)
        //     }),
        //     onError: ((error) => {
        //         throw new Error('Unable to accept order')
        //     })
        // })

        //chamar rota q envia para fila
        router.push(`/(tabs)/order/${orderId}`)
    }
    return (
        <SafeAreaView style={styles.container}>
            <Header name="Fulano" />
            <View style={styles.orders}>

                <View style={styles.heading}>

                    <Text style={[TYPOGRAPHY.title]}>
                        Pedidos
                    </Text>
                    <Text style={TYPOGRAPHY.subtitle}>
                        Selecione um pedido para aceitar iniciar
                        sua rota!
                    </Text>
                </View>
                <OrdersList handleOpenModal={setShowAceptOrderModal} />

                <AcceptOrderModal
                    visible={showAceptOrderModal}
                    onCancel={() => setShowAceptOrderModal(false)}
                    onConfirm={() => handleAcceptOrder("1")}
                />

            </View>
        </SafeAreaView>
    )
}