import { Loading } from "@/components/Atoms/Loading";
import { DeliveryOrderDetail } from "@/Screens/DeliveryOrderDetail";
import { OrderDetail } from "@/Screens/OrderDetail";
import { useOrderDetail } from "@/services/queries/useOrderDetail";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";

export default function Screen() {
  const { id } = useLocalSearchParams();
  console.log("aaa", id);

  const { data, isLoading, error } = useOrderDetail(id as string);

  if (error) {
    throw new Error("Unable to find order with this id");
  }

  if (isLoading) {
    return <Loading />;
  }

  return <DeliveryOrderDetail order={data!} />;
}
