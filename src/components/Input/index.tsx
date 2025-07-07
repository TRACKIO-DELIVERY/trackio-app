import { ComponentType } from "react";
import { TextInput, TextInputProps, View } from "react-native";
import { styles } from "./styles";
import { SvgProps } from "react-native-svg";
import { THEME } from "@/constants/theme";
import { TYPOGRAPHY } from "@/constants/typography";

interface InputProps extends TextInputProps {
  icon?: ComponentType<SvgProps>;
}
export function Input({ icon: Icon, ...rest }: InputProps) {
  return (
    <View style={styles.container}>
      {Icon && <Icon height={16} width={16} color={THEME.grey[700]} />}

      <TextInput
        placeholderTextColor={THEME.grey[700]}
        style={[TYPOGRAPHY.inputText, styles.inputContainer]}
        {...rest}
      />
    </View>
  );
}
