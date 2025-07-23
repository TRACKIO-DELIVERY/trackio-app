import { Loading } from "@/components/Atoms/Loading";
import { useOrders } from "@/services/queries/useOrders";
import { FlatList, Text, View } from "react-native";

export function OrdersList() {

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
                <View>
                    <Text>{item.deliveryFee}</Text>
                    <Text>{item.deliveryPerson?.fullName || 'sem entregador'}</Text>
                    <Text>{item.establishment.name}</Text>
                </View>
            )}
            contentContainerStyle={{
                gap: 12,
            }}

        />

    )
}