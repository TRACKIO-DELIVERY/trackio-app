import { OrderDetail } from "@/components/Screens/OrderDetail";
import { useOrderDetail } from "@/services/queries/useOrderDetail";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";

export default function Screen() {
    const { id } = useLocalSearchParams()

    // const { data, isLoading, error } = useOrderDetail(id as string)

    // if (error || !data) {
    //     throw new Error("Unable to find order with this id")
    // }

    return <OrderDetail orderId={id as string} />
}