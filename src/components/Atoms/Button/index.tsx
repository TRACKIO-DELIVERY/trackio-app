import { THEME } from "@/constants/theme";
import { ComponentType } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { SvgProps } from "react-native-svg";
import { styles } from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  icon?: ComponentType<SvgProps>;
  variant?: "primary" | "secondary" | "google";
}

export function Button({
  title,
  icon: Icon,
  variant = "primary",
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.base, styles[variant]]}
      {...rest}
      testID="Button"
    >
      {Icon && <Icon width={20} height={20} color={THEME.grey[100]} />}
      {title && (
        <Text style={[styles.textBase, styles[`${variant}Text`]]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
