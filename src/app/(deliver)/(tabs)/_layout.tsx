import { Tabs } from "expo-router";

import { THEME } from "@/constants/theme";

import Home from "@/assets/icons/home.svg";
import Package from "@/assets/icons/package.svg";
import Person from "@/assets/icons/person.svg";
import { Text, View } from "react-native";
import { useDeliveriesStore } from "@/hooks/useDeliveries";

export default function TabsLayout() {
  const deliveriesStore = useDeliveriesStore();
  if (!deliveriesStore) return null;
  const orders = deliveriesStore((state) => state.orders);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: THEME.primary[700],
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Home color={color} width={25} height={25} />
          ),
        }}
      />
      <Tabs.Screen
        name="deliveries"
        options={{
          title: "Sua entregas",
          tabBarIcon: ({ color }) => (
            <View>
              <Package color={color} width={25} height={25} />
              {orders.length > 0 && (
                <View
                  style={{
                    backgroundColor: THEME.green[600],
                    width: 20,
                    height: 20,
                    position: "absolute",
                    right: -10,
                    top: -10,
                    borderRadius: 999,
                  }}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      fontSize: 12,
                    }}
                  >
                    {orders.length}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <Person color={color} width={25} height={25} />
          ),
        }}
      />
    </Tabs>
  );
}
