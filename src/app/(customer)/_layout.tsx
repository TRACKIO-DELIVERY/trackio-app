import { Tabs } from "expo-router";

import { THEME } from "@/constants/theme";

import Home from "@/assets/icons/home.svg";
import Package from "@/assets/icons/package.svg";
import Person from "@/assets/icons/person.svg";

export default function TabsLayout() {
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
        name="cart"
        options={{
          title: "Carrinho",
          tabBarIcon: ({ color }) => (
            <Package color={color} width={25} height={25} />
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
      <Tabs.Screen
        name="product/[id]"
        options={{
          title: "Product",
          href: null,
          tabBarStyle: { display: "none" },
        }}
      />
    </Tabs>
  );
}
