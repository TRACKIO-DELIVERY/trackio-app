import { Loading } from "@/components/Atoms/Loading";
import { useOrders } from "@/services/queries/useOrders";
import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { OrderCard } from "../OrderCard";
import { useRouter } from "expo-router";

export function OrdersList() {
  const { data, isFetching, error, refetch } = useOrders();
  const navigation = useRouter();
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
  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <OrderCard
            order={item}
            onPress={() => {
              navigation.push(`/(deliver)/order/${item.id}`);
            }}
          />
        )}
        contentContainerStyle={{
          paddingBottom: 90,
          gap: 16,
        }}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
      />
    </>
  );
}
