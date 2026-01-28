import { Loading } from "@/components/Atoms/Loading";
import { DeliveryOrderDetail } from "@/Screens/DeliveryOrderDetail";
import { OrderDetail } from "@/Screens/OrderDetail";
import { useOrderDetail } from "@/services/queries/useOrderDetail";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert } from "react-native";

export default function Screen() {
  const { id } = useLocalSearchParams();

  const { data, isLoading, error } = useOrderDetail(id as string);

  if (error) {
    Alert.alert("Não foi possível acessar os detalhes desse pedido");
  }

  if (isLoading) {
    return <Loading />;
  }

  return <DeliveryOrderDetail order={data!} />;
}
