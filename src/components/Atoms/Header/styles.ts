import { THEME } from "@/constants/theme";
import { StyleSheet } from "react-native-unistyles";


export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 120,
        position: 'absolute',
        zIndex: 999,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        top: 0,
        left: 0,
        right: 0,
        paddingTop: 26,
        paddingHorizontal: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: THEME.purple[700]
    },
    items: {

    },
})
