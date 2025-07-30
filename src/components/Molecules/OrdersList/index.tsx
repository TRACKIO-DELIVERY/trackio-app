import { Loading } from "@/components/Atoms/Loading";
import { useOrders } from "@/services/queries/useOrders";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { OrderCard } from "../OrderCard";

interface OrderListInterface {
    handleOpenModal: (showModal: boolean) => void
}
export function OrdersList({ handleOpenModal }: OrderListInterface) {

    const { data, isFetching, error } = useOrders()

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

    return (

        <FlatList
            data={data}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleOpenModal(true)}>
                    <OrderCard
                        status={"disponivel"}
                        title={`Pedido ${item.id}`}
                        deliverer={item.deliveryPerson?.fullName || 'Sem entregador'}
                        company={item.establishment.name}
                        deliveryFee={item.deliveryFee}
                    />

                </TouchableOpacity>
            )}
            contentContainerStyle={{
                gap: 12,
            }}

        />

    )
}