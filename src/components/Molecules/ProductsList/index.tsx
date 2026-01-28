import { Loading } from "@/components/Atoms/Loading";
import {
  FlatList,
  RefreshControl,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { useProducts } from "@/services/queries/useProducts";
import { ProductCard } from "../ProductCard";
import { Product } from "@/@types/models/product";

type Section = {
  title: string;
  data: Product[];
};

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

  const sections = Object.values<Section>(
    data?.reduce((acc: any, product) => {
      const companyName = product.companyName;

      if (!acc[companyName]) {
        acc[companyName] = {
          title: companyName,
          data: [],
        };
      }

      acc[companyName].data.push(product);
      return acc;
    }, {} as Section),
  );

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
      <SectionList
        sections={sections}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderSectionHeader={({ section }) => (
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              marginTop: 16,
              marginBottom: 8,
            }}
          >
            {section.title}
          </Text>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => goToProductDetail(item.id)}>
            <ProductCard
              image={item.imageUrl}
              price={item.price}
              name={item.name}
              stock={item.stock}
              category={item.categoryName}
              onAdd={() => goToProductDetail(item.id)}
            />
          </TouchableOpacity>
        )}
        contentContainerStyle={{
          gap: 8,
          paddingBottom: 90,
          paddingLeft: 12,
        }}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
      />
    </>
  );
}
