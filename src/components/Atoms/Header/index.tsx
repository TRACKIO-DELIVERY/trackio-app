import { View, Text } from "react-native";
import { styles } from "./styles";
import { TYPOGRAPHY } from "@/constants/typography";
import { THEME } from "@/constants/theme";
interface HeaderProps {
  name: string;
  role: string;
}

export function Header({ name, role }: HeaderProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text
          style={[
            TYPOGRAPHY.bodyText,
            { fontSize: 16, color: THEME.textHeader },
          ]}
        >
          Olá,{" "}
          <Text style={[TYPOGRAPHY.titleHeader, { color: THEME.textHeader2 }]}>
            {name}
          </Text>{" "}
          👋
        </Text>
        <Text style={[TYPOGRAPHY.bodyText, { color: THEME.textHeader }]}>
          {role == "CUSTOMER"
            ? "O que vai pedir hoje?"
            : "Pronto para mais uma entrega?"}
        </Text>
      </View>
    </View>
  );
}
