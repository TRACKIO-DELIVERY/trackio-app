import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
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

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  companyId: number;
}

interface Props {
  productId: string;
}

export function ProductDetailsScreen({ productId }: Props) {
  const { data, isFetching, error } = useProductDetail(productId);
  const { addToCart } = useCartStore();

  const navigation = useNavigation();
  if (isFetching) {
    return <Loading />;
  }

  if (error) {
    return <Text> Produto não pode ser carregado</Text>;
  }

  function handleAddProductToCard() {
    if (data) {
      addToCart(data);
      Alert.alert("Produto adicionado");
      navigation.goBack();
    }
  }
  return (
    <ScrollView style={styles.container}>
      <GoBackButton onPress={() => navigation.goBack()} />
      {/* Imagem do Produto */}
      <Image
        source={{ uri: data?.image }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.title}>{data?.name}</Text>

        <Text style={styles.description}>{data?.description}</Text>

        <Text style={styles.price}>
          R$ {data?.price?.toFixed(2) || "Sem preço"}
        </Text>

        {/* Botão de compra */}
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
