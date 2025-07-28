import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        marginHorizontal: 20,
        marginBottom: 8,
        color: "#1A1A1A",
    },
    list: {
        paddingHorizontal: 20,
        paddingBottom: 16,
    },
    card: {
        backgroundColor: "#F7F7F7",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
        elevation: 2,
    },
    client: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    company: {
        fontSize: 14,
        color: "#007AFF",
        marginTop: 2,
    },
    address: {
        fontSize: 13,
        color: "#555",
        marginTop: 4,
    },
    date: {
        fontSize: 12,
        color: "#888",
        marginTop: 6,
    },
});