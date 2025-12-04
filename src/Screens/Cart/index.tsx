import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useCartStore } from "@/storage/cart";
import { styles } from "./styles";
import { THEME } from "@/constants/theme";
import { GoBackButton } from "@/components/Atoms/GoBackButton";
import { OrderDTO } from "@/dtos/orderDTO";

export function CartScreen() {
  const navigation = useNavigation();
  const products = useCartStore((state) => state.products);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const total = products.reduce(
    (acc, p) => acc + p.price * (p.quantity || 1),
    0
  );

  function handleCreateOrder() {
    if (products.length === 0) return;
    // const newOrder: OrderDTO = {

    // }
  }

  return (
    <View style={styles.container}>
      <GoBackButton onPress={navigation.goBack} />
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
          <Text style={styles.checkoutText}>Finalizar Pedido</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
