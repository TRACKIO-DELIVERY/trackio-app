import { StyleSheet } from "react-native";
import { THEME } from "@/constants/theme";

export const styles = StyleSheet.create({
  container: {
    padding: 14,
    gap: 6,
  },

  badge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: THEME.green[600],
  },

  badgeText: {
    fontSize: 14,
    fontWeight: "600",
  },

  orderId: {
    fontSize: 18,
    fontWeight: "700",
    color: THEME.blue[600],
  },

  text: {
    fontSize: 16,
    color: THEME.grey[800],
  },

  highlight: {
    fontWeight: "600",
    color: THEME.grey[800],
  },
});
