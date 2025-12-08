import { ProductDetailsScreen } from "@/Screens/ProductDetail";
import { useLocalSearchParams } from "expo-router";

export default function Screen() {
  const { id } = useLocalSearchParams();

  // const { data, isLoading, error } = useOrderDetail(id as string)

  // if (error || !data) {
  //     throw new Error("Unable to find order with this id")
  // }

  return <ProductDetailsScreen productId={id as string} />;
}
