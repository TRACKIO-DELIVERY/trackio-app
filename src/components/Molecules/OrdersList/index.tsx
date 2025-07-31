import { Loading } from "@/components/Atoms/Loading";
import { useOrders } from "@/services/queries/useOrders";
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { OrderCard } from "../OrderCard";
import { AcceptOrderModal } from "../AcceptOrderModal";
import { useState } from "react";
import { router } from "expo-router";
import { useAcceptOrder } from "@/services/queries/useAcceptOrder";
import { sendAcceptedOrderToQueue } from "@/services/queries/sendOrderToQueu";
import { useAuth } from "@/hooks/useAuth";


export function OrdersList() {
    const { user } = useAuth()

    const [showAceptOrderModal, setShowAceptOrderModal] = useState(false)
    const { mutateAsync: AceptOrder } = useAcceptOrder()
    const { mutateAsync: sendAcceptedOrder } = sendAcceptedOrderToQueue()
    const { data, isFetching, error, refetch } = useOrders()

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

    async function handleAcceptOrder(orderId: string) {

        const orderToQueue = {
            orderId,
            deliveryPersonId: user?.user_id,
            url: `http://localhost:3000/api/track/map/${orderId}`,
        }
        try {

            await AceptOrder(orderId)
            await sendAcceptedOrder(orderToQueue)

            router.push(`/(tabs)/order/${orderId}`)
            setShowAceptOrderModal(false)

        } catch (error) {
            console.log('Erro ao aceitar pedido', error)
            throw new Error('Unable to accept order')
        }

    }

    return (
        <>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => setShowAceptOrderModal(true)}>
                        <OrderCard
                            status={item.orderStatus}
                            title={`Pedido #${item.id}`}
                            company={item.establishment}
                            deliveryFee={item.deliveryFee}
                        />

                        <AcceptOrderModal
                            visible={showAceptOrderModal}
                            onCancel={() => setShowAceptOrderModal(false)}
                            onConfirm={() => handleAcceptOrder(String(item.id))}
                        />
                    </TouchableOpacity>
                )}
                contentContainerStyle={{
                    gap: 12,
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={isFetching}
                        onRefresh={refetch}
                    />
                }


            />

        </>

    )
}