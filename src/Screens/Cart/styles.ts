import { THEME } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.grey[100],
    paddingTop: 100,
    padding: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  headerTitle: {
    color: THEME.grey[900],
    fontSize: 22,
    fontWeight: "600",
    marginLeft: 12,
  },

  listContent: {
    paddingBottom: 120,
  },

  card: {
    backgroundColor: THEME.grey[100],
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  productImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: THEME.grey[400],
  },

  cardInfo: {
    flex: 1,
    marginLeft: 14,
  },

  productName: {
    color: THEME.primary[700],
    fontSize: 16,
    fontWeight: "600",
  },

  productPrice: {
    color: THEME.grey[800],
    fontSize: 14,
  },

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: THEME.grey[100],
    borderTopWidth: 1,
    borderTopColor: THEME.grey[400],
    padding: 20,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  totalLabel: {
    color: THEME.grey[900],
    fontSize: 18,
  },

  totalValue: {
    color: THEME.primary[700],
    fontSize: 20,
    fontWeight: "700",
  },

  checkoutButton: {
    backgroundColor: THEME.primary[800],
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  checkoutText: {
    color: THEME.grey[100],
    fontSize: 18,
    fontWeight: "600",
  },
});
