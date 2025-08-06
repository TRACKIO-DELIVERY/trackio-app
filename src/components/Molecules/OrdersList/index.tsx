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
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)

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
    function openModal(orderId: string) {
        setSelectedOrderId(orderId)
        setShowAceptOrderModal(true)
    }

    function closeModal() {
        setSelectedOrderId(null)
        setShowAceptOrderModal(false)
    }

    async function handleAcceptOrder(orderId: string) {

        const orderToQueue = {
            order_id: orderId,
            order_status: 1,
            delivery_person: user?.user_id,
            url: `https://trackio.amisahdev.com.br/track/map/${orderId}`
        }
        try {

            await AceptOrder(orderId)
            await sendAcceptedOrder(orderToQueue)

            router.push(`/(tabs)/order/${orderId}`)

            setShowAceptOrderModal(false)

        } catch (error) {
            console.log(error)
            throw new Error('Unable to accept order')
        }

    }
    return (
        <>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => openModal(String(item.id))}>
                        <OrderCard
                            status={item.orderStatus}
                            title={`Pedido #${item.id}`}
                            deliveryAddress={item.fullDeliveryAddress}
                            company={item.establishment}
                            deliveryFee={item.deliveryFee}
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

            <AcceptOrderModal
                visible={showAceptOrderModal}
                onCancel={closeModal}
                onConfirm={() => {
                    if (selectedOrderId) {
                        handleAcceptOrder(selectedOrderId)
                    }
                }}
            />

        </>

    )
}