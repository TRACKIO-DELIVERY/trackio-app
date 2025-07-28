import { Tabs } from "expo-router";

import Home from "@/assets/icons/home.svg";
import { THEME } from "@/constants/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: THEME.purple[700],
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home color={color} />,
        }}
      />
      <Tabs.Screen
        name="deliveries"
        options={{
          title: "Sua entregas",
          tabBarIcon: ({ color }) => <Home color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => <Home color={color} />,
        }}
      />
      <Tabs.Screen
        name="order/[id]"
        options={{
          title: "Order",
          href: null,
          tabBarStyle: { display: 'none' }
        }}

      />
    </Tabs>
  );
}
