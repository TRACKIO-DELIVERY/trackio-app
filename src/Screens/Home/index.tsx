import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { Header } from "@/components/Atoms/Header";
import { OrdersList } from "@/components/Molecules/OrdersList";
import { Text, View } from "react-native";
import { TYPOGRAPHY } from "@/constants/typography";
import { Loading } from "@/components/Atoms/Loading";
import { ProductsList } from "@/components/Molecules/ProductsList";

import { useAuth } from "@/contexts/Auth";

export function Home() {
  const { user, status } = useAuth();
  if (status === "loading") {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        name={user?.username || "Entregador(a)"}
        role={user?.role || "cliente"}
      />
      <View style={styles.orders}>
        <View style={styles.heading}>
          <Text style={[TYPOGRAPHY.title]}>
            {user?.role == "CUSTOMER" ? "Produtos" : "Pedidos"}
          </Text>
          <Text style={TYPOGRAPHY.subtitle}>
            {user?.role == "CUSTOMER"
              ? "Escolha entre os melhores produtos da região!"
              : " Selecione um pedido para aceitar iniciar sua rota!"}
          </Text>
        </View>

        {user?.role == "CUSTOMER" ? <ProductsList /> : <OrdersList />}
      </View>
    </SafeAreaView>
  );
}
