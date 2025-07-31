import { Loading } from "@/components/Atoms/Loading";
import { useOrders } from "@/services/queries/useOrders";
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { OrderCard } from "../OrderCard";
import { AcceptOrderModal } from "../AcceptOrderModal";
import { useState } from "react";
import { router } from "expo-router";


export function OrdersList() {

    const [showAceptOrderModal, setShowAceptOrderModal] = useState(false)
    const [orderId, setOrderId] = useState('')
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
                onCancel={() => setShowAceptOrderModal(false)}
                onConfirm={() => handleAcceptOrder("1")}
            />
        </>

    )
}