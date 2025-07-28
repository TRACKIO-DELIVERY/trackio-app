import House from "@/assets/icons/home.svg";
import { Button } from "@/components/Atoms/Button";
import { useAuth } from "@/hooks/useAuth";
import { Text, View } from "react-native";
import { OrderCard } from "@/components/Molecules/OrderCard"

export default function Index() {
  const { user, signOut } = useAuth();
  return (
    <View style={{ backgroundColor: "rgb(255, 255, 255)", flex: 1 }}>
      <Text>Ola, {user?.name}</Text>

      <OrderCard
        title="Pedido de piraque"
        company="Empresa piraque"
        status="disponivel"
      />

      <OrderCard
        title="Pedido de piraque"
        company="Empresa piraque"
        status="em_rota"
        deliverer="Grendi Moster"
      />

      <Button title="deslogar" onPress={signOut} icon={House} />
      <House />
    </View>
  );
}
