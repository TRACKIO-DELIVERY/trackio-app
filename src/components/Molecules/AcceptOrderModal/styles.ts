import { THEME } from "@/constants/theme";
import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 24,
        width: "85%",
        elevation: 10,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#111",
        marginBottom: 8,
    },
    description: {
        fontSize: 15,
        color: "#444",
        marginBottom: 24,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 12,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    cancelButton: {
        backgroundColor: "#f0f0f0",
    },
    confirmButton: {
        backgroundColor: THEME.purple[700],
    },
    buttonText: {
        fontSize: 15,
        fontWeight: "600",
    },
});
