import House from "@/assets/icons/home.svg";
import { useAuth } from "@/hooks/useAuth";
import { Text, View } from "react-native";

export default function Index() {
  const { user } = useAuth();
  return (
    <View style={{ backgroundColor: "rgb(255, 255, 255)", flex: 1 }}>
      <Text>Ola, {user?.name}</Text>
      <House />
    </View>
  );
}
