import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { useCartStore } from "@/storage/cart";
import { styles } from "./styles";
import { THEME } from "@/constants/theme";
import { GoBackButton } from "@/components/Atoms/GoBackButton";
import { Order } from "@/@types/models/order";
import { useAuth } from "@/hooks/useAuth";
import { useCustomerOrdersStore } from "@/storage/orders";
import { useRouter } from "expo-router";

export function CartScreen() {
  const { user } = useAuth();
  const navigation = useRouter();
  const products = useCartStore((state) => state.products);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const createOrder = useCustomerOrdersStore((state) => state.createOrder);

  const total = products.reduce(
    (acc, p) => acc + p.price * (p.quantity || 1),
    0
  );

  function handleCreateOrder() {
    if (products.length === 0) return;

    try {
      const newOrder: Order = {
        customerId: user?.userId || 1,
        date: new Date(),
        deliveryPersonId: 1,
        id: total + 1,
        procucts: products,
        status: 1,
        total: total,
      };
      createOrder(newOrder);
      clearCart();
      navigation.push("/(customer)/(tabs)/orders");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <GoBackButton onPress={navigation.back} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meu Carrinho</Text>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item, index) => item.id.toString() + index}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.productImage} />

            <View style={styles.cardInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>
                R$ {item.price.toFixed(2)}
              </Text>
              <Text>Quantidade: {item.quantity}</Text>
            </View>

            <TouchableOpacity onPress={() => removeFromCart(item.id)}>
              <Ionicons
                name="trash-outline"
                size={26}
                color={THEME.primary[700]}
              />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText} onPress={handleCreateOrder}>
            Finalizar Pedido
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
