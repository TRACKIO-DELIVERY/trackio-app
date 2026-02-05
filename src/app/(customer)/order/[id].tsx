import { CustomerOrderDetail } from "@/Screens/CustomerOrderDetail";
import { useOrderDetail } from "@/services/queries/useOrderDetail";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";

export default function Screen() {
  const { id } = useLocalSearchParams();

  return <CustomerOrderDetail orderId={Number(id)} />;
}
