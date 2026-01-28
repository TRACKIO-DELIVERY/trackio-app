import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { useCartStore } from "@/storage/cart";
import { styles } from "./styles";
import { THEME } from "@/constants/theme";
import { GoBackButton } from "@/components/Atoms/GoBackButton";
import { Order, OrderItem } from "@/@types/models/order";
import { useAuth } from "@/hooks/useAuth";
import { useCustomerOrdersStore } from "@/storage/orders";
import { useRouter } from "expo-router";
import { useCreateOrder } from "@/services/queries/useCreateOrder";
import { CreateOrderDTO } from "@/@types/api/orderDTO";

export function CartScreen() {
  const { user } = useAuth();
  const navigation = useRouter();
  const products = useCartStore((state) => state.products);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const createOrder = useCustomerOrdersStore((state) => state.createOrder);

  const { mutate, isPending } = useCreateOrder();

  const total = products.reduce(
    (acc, p) => acc + p.price * (p.quantity || 1),
    0,
  );

  function handleCreateOrder() {
    if (products.length === 0) return;

    const items: OrderItem[] = products.map((p) => ({
      productId: p.id,
      productName: p.name,
      quantity: p.quantity,
      unitPrice: p.price,
    }));

    const companyID = products[0].companyId;
    const newOrderToBack: CreateOrderDTO = {
      customerId: user?.userId!,
      companyId: companyID,
      items,
      payment: {
        paymentMethod: "PIX",
      },
    };

    mutate(newOrderToBack, {
      onSuccess: (data: Order) => {
        createOrder(data);
        clearCart();

        Alert.alert(
          "Pedido realizado 🎉",
          "Seu pedido foi criado com sucesso!",
          [
            {
              text: "OK",
              onPress: () => navigation.push("/(customer)/(tabs)/orders"),
            },
          ],
        );
      },
      onError: (error: any) => {
        console.error("Erro ao criar pedido:", error.message);

        Alert.alert(
          "Erro ao criar pedido ❌",
          "Não foi possível finalizar seu pedido. Tente novamente.",
        );
      },
    });
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
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.productImage}
            />

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

        <TouchableOpacity style={styles.checkoutButton} disabled={isPending}>
          <Text style={styles.checkoutText} onPress={handleCreateOrder}>
            {isPending ? "Finalizando..." : "Finalizar Pedido"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
