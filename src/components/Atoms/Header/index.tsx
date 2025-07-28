import { View, Text } from "react-native";
import { styles } from './styles'
import { TYPOGRAPHY } from "@/constants/typography";
import { THEME } from "@/constants/theme";
interface HeaderProps {
    name: string;
}

export function Header({ name }: HeaderProps) {
    return (
        <View style={styles.container}>
            <View>
                <Text style={[TYPOGRAPHY.bodyText, { fontSize: 20, color: THEME.textHeader }]}>
                    Olá, <Text style={[TYPOGRAPHY.title, { color: THEME.textHeader2 }]} >{name}</Text> 👋
                </Text>
                <Text style={[TYPOGRAPHY.bodyText, { color: THEME.textHeader }]}>Pronto para mais uma entrega?</Text>
            </View>
        </View>
    );
}
