import { THEME } from "@/constants/theme";
import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
    width: 84,
    height: 84,
    borderRadius: 8,
    backgroundColor: THEME.grey[500],
    alignItems: 'center',
    justifyContent: 'center'
  },
});