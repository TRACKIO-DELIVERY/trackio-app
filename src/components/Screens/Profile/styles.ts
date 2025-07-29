import { THEME } from "@/constants/theme";
import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 8,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "700",
        color: "#1A1A1A",
    },
    profileCard: {
        alignItems: "center",
        marginTop: 40,
        paddingHorizontal: 20,
    },
    avatar: {
        width: 140,
        height: 140,
        borderRadius: 999,
        marginBottom: 12,
    },
    name: {
        fontSize: 24,
        fontWeight: "600",
        color: THEME.purple[800]
    },
    email: {
        fontSize: 14,
        color: THEME.text,
        marginTop: 4,
    },
    section: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 12,
        color: THEME.purple[800]
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        gap: 12,
    },
    optionText: {
        fontSize: 15,
        color: "#333",
    },
    logout: {
        marginTop: 16,
    },
    avatarEmpty: {
        borderRadius: 999,
        marginBottom: 12,
        backgroundColor: THEME.grey[600],
        height: 140,
        width: 140
    }
});