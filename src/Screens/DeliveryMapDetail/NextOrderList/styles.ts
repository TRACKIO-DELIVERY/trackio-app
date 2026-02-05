import { StyleSheet } from "react-native";
import { THEME } from "@/constants/theme";

export const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: THEME.grey[100],
    gap: 6,
  },

  title: {
    fontSize: 14,
    fontWeight: "600",
    color: THEME.grey[600],
  },

  item: {
    fontSize: 13,
    color: THEME.grey[700],
  },
});
