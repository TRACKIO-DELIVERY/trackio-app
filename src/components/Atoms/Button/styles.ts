import { THEME } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 12,
    height: 56,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  primary: {
    backgroundColor: THEME.purple[700],
  },
  secondary: {
    backgroundColor: THEME.grey[100],
    borderColor: THEME.purple[700],
    borderWidth: 1.5,
  },
  google: {
    backgroundColor: THEME.grey[100],
    borderColor: THEME.blue[600],
    borderWidth: 1.5,
  },
  textBase: {
    fontFamily: "Sen_500Medium",
    fontSize: 20,
  },
  primaryText: {
    color: THEME.grey[100],
  },
  secondaryText: {
    color: THEME.purple[700],
  },
  googleText: {
    color: THEME.blue[600],
  },
});
