import { StyleSheet } from "react-native";
import { THEME } from "@/constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 120,
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

  buttonPrimary: {
    marginTop: 20,
    backgroundColor: THEME.primary[700],
    padding: 14,
    borderRadius: 10,
  },
  buttonSecondary: {
    marginTop: 20,
    backgroundColor: THEME.primary[800],
    padding: 14,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  finishedBox: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#e5ffe5",
    borderRadius: 8,
  },
  finishedText: {
    textAlign: "center",
    fontSize: 16,
    color: "#36963a",
  },
});
