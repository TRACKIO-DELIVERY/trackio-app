import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/Atoms/Header";
import { styles } from "./styles";
import { OrderCard } from "@/components/Molecules/OrderCard";
import { TYPOGRAPHY } from "@/constants/typography";
import { useAuth } from "@/hooks/useAuth";
import { useDeliveryOrdersStore } from "@/storage/deliverOrders";
import { Button } from "@/components/Atoms/Button";

export function Deliveries() {
  const { user } = useAuth();
  const orders = useDeliveryOrdersStore((state) => state.orders);
  const cancelOrder = useDeliveryOrdersStore((state) => state.cancelOrder);
  return (
    <SafeAreaView style={styles.container}>
      <Header role="entregador" name={user?.name || "Entregador(a)"} />
      <View style={styles.orders}>
        <View style={styles.heading}>
          <Text style={[TYPOGRAPHY.title]}>Pedidos Aceitos</Text>
          <Text style={TYPOGRAPHY.subtitle}>
            Começa a rota dos seus pedidos aqui!
          </Text>
        </View>
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            gap: 12,
          }}
          renderItem={({ item }) => (
            <OrderCard order={item} onRemove={() => cancelOrder(item.id)} />
          )}
        />

        {/*enviar para tela do mapa, enviar os pedidos */}
        <Button title="Iniciar rota" />
      </View>
    </SafeAreaView>
  );
}
