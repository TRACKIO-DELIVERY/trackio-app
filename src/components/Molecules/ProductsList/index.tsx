import { Loading } from "@/components/Atoms/Loading";
import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { useProducts } from "@/services/queries/useProducts";
import { ProductCard } from "../ProductCard";

export function ProductsList() {
  const { data, isFetching, error, refetch } = useProducts();

  if (error) {
    console.log(error);
    return (
      <View>
        <Text> Não foi possível carregar pedidos, desculpe!</Text>
      </View>
    );
  }

  if (isFetching) {
    return <Loading />;
  }

  async function goToProductDetail(productId: number) {
    try {
      router.push(`/(customer)/product/${productId}`);
    } catch (error) {
      console.log(error);
      throw new Error("Unable to accept order");
    }
  }
  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <ProductCard
              image={item.image}
              price={item.price}
              name={item.name}
              onAdd={() => goToProductDetail(item.id)}
              key={item.id}
              category={item.categoryId}
            />
          </TouchableOpacity>
        )}
        contentContainerStyle={{
          gap: 8,
        }}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
      />
    </>
  );
}
