import { useState } from "react";
import { View, TextInput } from "react-native";
import { styles } from "./styles";
import { ComponentType } from "react";
import { SvgProps } from "react-native-svg";
import { THEME } from "@/constants/theme";
import { TYPOGRAPHY } from "@/constants/typography";

interface InputDateProps {
    icon?: ComponentType<SvgProps>;
    onChangeFormatted: (value: string) => void; // yyyy-mm-dd
    placeholder?: string;
}

export function InputDateMasked({ icon: Icon, onChangeFormatted, placeholder }: InputDateProps) {
    const [displayValue, setDisplayValue] = useState("");

    function formatToDDMMYYYY(text: string) {
        // Remove qualquer caractere que não seja número
        const numbers = text.replace(/\D/g, "").slice(0, 8);

        const day = numbers.slice(0, 2);
        const month = numbers.slice(2, 4);
        const year = numbers.slice(4, 8);

        let formatted = day;
        if (month) formatted += "/" + month;
        if (year) formatted += "/" + year;

        return formatted;
    }

    function handleChange(text: string) {
        const formatted = formatToDDMMYYYY(text);
        setDisplayValue(formatted);

        if (formatted.length === 10) {
            const [dd, mm, yyyy] = formatted.split("/");
            const queryDate = `${yyyy}-${mm}-${dd}`;
            onChangeFormatted(queryDate);
        } else {
            onChangeFormatted(""); // vazio ou inválido
        }
    }

    return (
        <View style={styles.container}>
            {Icon && <Icon height={16} width={16} color={THEME.grey[700]} />}

            <TextInput
                placeholder={placeholder || "dd/mm/aaaa"}
                keyboardType="numeric"
                value={displayValue}
                onChangeText={handleChange}
                placeholderTextColor={THEME.grey[700]}
                style={[TYPOGRAPHY.inputText, styles.inputContainer]}
            />
        </View>
    );
}
