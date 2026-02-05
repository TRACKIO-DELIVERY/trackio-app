import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#020617",
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  header: {
    marginBottom: 10,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },

  title: {
    color: "#e5e7eb",
    fontSize: 15,
    fontWeight: "600",
  },

  status: {
    fontSize: 12,
    fontWeight: "600",
  },

  statusInRoute: {
    color: "#38bdf8",
  },

  statusPending: {
    color: "#facc15",
  },

  statusDelivered: {
    color: "#22c55e",
  },

  address: {
    color: "#94a3b8",
    fontSize: 12,
    lineHeight: 16,
  },

  footer: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  progressBadge: {
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#1e293b",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  progressText: {
    color: "#94a3b8",
    fontSize: 11,
  },

  finishButton: {
    backgroundColor: "#22c55e",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },

  finishButtonDisabled: {
    backgroundColor: "#064e3b",
  },

  finishButtonText: {
    color: "#020617",
    fontSize: 13,
    fontWeight: "700",
  },
});
