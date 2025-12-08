import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(255, 255, 255)",
    },
    orders: {
        paddingTop: 100,
        paddingHorizontal: 12,
    },

    title: {
        fontSize: 18,
        fontWeight: "600",
        marginHorizontal: 8,
        marginBottom: 8,
        color: "#1A1A1A",
    },
    heading: {
        paddingLeft: 8,
        paddingBottom: 12
    },
    list: {
        paddingBottom: 16,
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