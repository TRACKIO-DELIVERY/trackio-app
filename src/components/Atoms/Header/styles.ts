import { THEME } from "@/constants/theme";
import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingTop: 20,
        paddingBottom: 12,
        backgroundColor: "#fff",
    },
    name: {
        color: THEME.purple[700],
    },
});
