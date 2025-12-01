import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    width: "100%",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 14,
  },

  iconWrapper: {
    width: 54,
    height: 54,
    borderRadius: 14,
    backgroundColor: "#F5F7FA",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
  },

  company: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },

  address: {
    fontSize: 14,
    color: "#777",
    marginTop: 8,
  },

  deliveryFee: {
    fontSize: 14,
    color: "#222",
    fontWeight: "500",
  },

  footerRow: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 50,
  },

  status1: { backgroundColor: "#DFF8E1" }, // disponível
  status2: { backgroundColor: "#FFF4D9" }, // em rota
  status3: { backgroundColor: "#E5E5E5" }, // finalizado

  statusText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
  },
});
