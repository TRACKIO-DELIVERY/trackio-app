import { useState } from "react";
import { View, TextInput } from "react-native";
import { styles } from "./styles";
import { ComponentType } from "react";
import { SvgProps } from "react-native-svg";
import { THEME } from "@/constants/theme";
import { TYPOGRAPHY } from "@/constants/typography";

interface InputCPFProps {
    icon?: ComponentType<SvgProps>;
    onChangeFormatted: (value: string) => void;
    placeholder?: string;
}

export function InputCPFMasked({ icon: Icon, onChangeFormatted, placeholder }: InputCPFProps) {
    const [displayValue, setDisplayValue] = useState("");

    function formatCPF(value: string) {
        const numbers = value.replace(/\D/g, "").slice(0, 11);

        let formatted = numbers;
        if (numbers.length > 3 && numbers.length <= 6)
            formatted = numbers.replace(/(\d{3})(\d+)/, "$1.$2");
        else if (numbers.length > 6 && numbers.length <= 9)
            formatted = numbers.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
        else if (numbers.length > 9)
            formatted = numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");

        return formatted;
    }

    function handleChange(text: string) {
        const formatted = formatCPF(text);
        setDisplayValue(formatted);

        const numeric = text.replace(/\D/g, "");
        if (numeric.length === 11) {
            onChangeFormatted(numeric);
        } else {
            onChangeFormatted("");
        }
    }

    return (
        <View style={styles.container}>
            {Icon && <Icon height={16} width={16} color={THEME.grey[700]} />}

            <TextInput
                placeholder={placeholder || "000.000.000-00"}
                keyboardType="numeric"
                value={displayValue}
                onChangeText={handleChange}
                placeholderTextColor={THEME.grey[700]}
                style={[TYPOGRAPHY.inputText, styles.inputContainer]}
            />
        </View>
    );
}
