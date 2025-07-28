import { View, Text } from "react-native";
import { styles } from './styles'
import { TYPOGRAPHY } from "@/constants/typography";
interface HeaderProps {
    name: string;
}

export function Header({ name }: HeaderProps) {
    return (
        <View style={styles.container}>
            <Text style={[TYPOGRAPHY.bodyText, { fontSize: 20 }]}>Olá, <Text style={styles.name}>{name}</Text> 👋</Text>
            <Text style={TYPOGRAPHY.bodyText}>Pronto para mais uma entrega?</Text>
        </View>
    );
}
