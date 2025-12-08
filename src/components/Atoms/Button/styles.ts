import { THEME } from "@/constants/theme";
import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 12,
    height: 56,
    borderRadius: 8,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  primary: {
    backgroundColor: THEME.primary[700],
  },
  secondary: {
    backgroundColor: THEME.grey[100],
    borderColor: THEME.primary[700],
    borderWidth: 1.5,
  },
  danger: {
    backgroundColor: THEME.red[500],
  },
  google: {
    backgroundColor: THEME.grey[100],
    borderColor: THEME.blue[600],
    borderWidth: 1.5,
  },
  textBase: {
    fontSize: 20,
    fontWeight: "600",
  },
  primaryText: {
    color: THEME.grey[100],
  },
  secondaryText: {
    color: THEME.primary[700],
  },
  googleText: {
    color: THEME.blue[600],
  },
  dangerText: {
    color: THEME.grey[100],
  },
});
