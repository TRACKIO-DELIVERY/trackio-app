import { THEME } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.grey[100],
    padding: 20,
    paddingTop: 50,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },

  card: {
    backgroundColor: THEME.grey[400],
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    borderColor: THEME.grey[500],
    borderWidth: 1,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
  },

  status: {
    fontSize: 14,
    fontWeight: "600",
    color: THEME.green[600],
  },

  date: {
    marginTop: 8,
    color: THEME.grey[800],
    fontSize: 14,
  },

  total: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "500",
  },

  totalValue: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "700",
  },
});
