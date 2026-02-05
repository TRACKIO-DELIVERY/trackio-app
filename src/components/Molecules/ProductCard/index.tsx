import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";

interface ProductCardProps {
  name: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  onAdd: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  category,
  image,
  stock,
  onAdd,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onAdd}>
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>

        <Text style={styles.category} numberOfLines={1}>
          {category}
        </Text>

        <Text style={styles.category} numberOfLines={1}>
          Em estoque: {stock}
        </Text>

        <Text style={styles.price}>R$ {price?.toFixed(2) || "sem preço"}</Text>
      </View>
    </TouchableOpacity>
  );
};
