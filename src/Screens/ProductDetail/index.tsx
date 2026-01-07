import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { styles } from "./styles";
import { useProductDetail } from "@/services/queries/useProductDetail";
import { Loading } from "@/components/Atoms/Loading";
import { GoBackButton } from "@/components/Atoms/GoBackButton";
import { useNavigation } from "expo-router";
import { useCartStore } from "@/storage/cart";

interface Props {
  productId: string;
}

export function ProductDetailsScreen({ productId }: Props) {
  const { data, isFetching, error } = useProductDetail(productId);
  const [quantity, setQuantity] = useState(1);

  const addToCart = useCartStore((state) => state.addToCart);

  const navigation = useNavigation();

  if (isFetching) {
    return <Loading />;
  }

  if (error) {
    return <Text> Produto não pode ser carregado</Text>;
  }

  function handleAddProductToCard() {
    if (!data) return;
    addToCart(data, quantity);
    setQuantity(1);
    Alert.alert("Produto adicionado");
    navigation.goBack();
  }

  function handleQuantity(op: "plus" | "minus") {
    if (op == "plus") setQuantity((state) => state + 1);
    else if (op == "minus") {
      setQuantity((state) => {
        if (state == 0) return state;
        return state - 1;
      });
    }
  }

  return (
    <ScrollView style={styles.container}>
      <GoBackButton onPress={() => navigation.goBack()} />

      <Image
        source={{ uri: data?.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.title}>{data?.name}</Text>

        <Text style={styles.description}>{data?.description}</Text>
        <Text style={styles.description}>Em estoque: {data?.stock}</Text>

        <View style={styles.quantityContainer}>
          <View style={styles.quantityButtons}>
            <TouchableOpacity onPress={() => handleQuantity("plus")}>
              <Text style={styles.quantityText}> + </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleQuantity("minus")}>
              <Text style={styles.quantityText}> - </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.quantityText}>{quantity}</Text>
        </View>
        <Text style={styles.price}>
          R$ {data?.price?.toFixed(2) || "Sem preço"}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={handleAddProductToCard}
        >
          <Text style={styles.buttonText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
