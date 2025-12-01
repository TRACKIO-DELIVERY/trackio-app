import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  onPress: () => void;
  color?: string;
  size?: number;
}

export const GoBackButton: React.FC<Props> = ({
  onPress,
  color = "#fff",
  size = 26,
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name="arrow-back" size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "rgba(0,0,0,0.4)",
    position: "absolute",
    left: 15,
    top: 40,
    zIndex: 10,
  },
});
