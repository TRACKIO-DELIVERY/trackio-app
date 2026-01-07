import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 14,
    marginVertical: 6,
    alignItems: "center",
    elevation: 3,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },

  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#EEF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  content: {
    marginLeft: 30,
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 2,
  },

  company: {
    color: "#555",
    marginBottom: 6,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  total: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2F80ED",
  },

  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },

  status_0: { backgroundColor: "#FFF3CD" }, // preparing
  status_1: { backgroundColor: "#D6EAF8" }, // on the way
  status_2: { backgroundColor: "#D5F5E3" }, // delivered

  statusText: {
    fontWeight: "600",
    fontSize: 12,
    color: "#333",
  },
});
