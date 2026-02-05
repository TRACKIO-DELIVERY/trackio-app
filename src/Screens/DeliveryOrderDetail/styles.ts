import { StyleSheet } from "react-native";
import { THEME } from "@/constants/theme";

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    padding: 16,
    paddingTop: 120,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 8,
  },
  company: {
    fontSize: 14,
    opacity: 0.7,
  },
  date: {
    fontSize: 12,
    marginBottom: 12,
    opacity: 0.5,
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
  },
  address: {
    fontSize: 14,
    opacity: 0.8,
  },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  productName: { fontSize: 15, flex: 2 },
  productQty: { fontSize: 15, flex: 1, textAlign: "center" },
  productPrice: { fontSize: 15, flex: 1, textAlign: "right" },

  totalBox: {
    marginTop: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalLabel: { fontSize: 18, fontWeight: "bold" },
  totalValue: { fontSize: 18, fontWeight: "bold" },
});
