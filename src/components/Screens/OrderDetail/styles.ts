import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
        backgroundColor: "rgb(255, 255, 255)",
        paddingTop: 15,
        paddingBottom: 15

    },
    headerCard: {
        backgroundColor: "#F2F2F2",
        padding: 12,
        borderRadius: 10,
        marginBottom: 12,
    },
    orderTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 4,
    },
    orderText: {
        fontSize: 14,
        color: "#555",
    },
    mapArea: {
        flex: 1,
        marginBottom: 16,
    },
    mapText: {
        color: "#999",
        fontStyle: "italic",
    },
    buttonGroup: {
        gap: 12,
    },
    goBack: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        marginBottom: 12,
    }
})