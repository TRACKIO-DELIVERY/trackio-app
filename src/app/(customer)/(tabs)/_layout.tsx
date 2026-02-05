import { Tabs } from "expo-router";

import { THEME } from "@/constants/theme";

import Home from "@/assets/icons/home.svg";
import Package from "@/assets/icons/package.svg";
import Bag from "@/assets/icons/bag.svg";
import Person from "@/assets/icons/person.svg";

import { Text, View } from "react-native";

import { useCartStore } from "@/hooks/useCart";
import { useOrdersStore } from "@/hooks/useOrders";

export default function TabsLayout() {
  const cart = useCartStore();
  if (!cart) return null;
  const products = cart((state) => state.products);
  const deliveriesStore = useOrdersStore();
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
          title: "Início",
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
            <View>
              <Bag color={color} width={25} height={25} />
              {products.length > 0 && (
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
                    {products.length}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Pedidos",
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
