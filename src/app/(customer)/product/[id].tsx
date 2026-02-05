import { ProductDetailsScreen } from "@/Screens/ProductDetail";
import { useLocalSearchParams } from "expo-router";

export default function Screen() {
  const { id } = useLocalSearchParams();

  return <ProductDetailsScreen productId={id as string} />;
}
