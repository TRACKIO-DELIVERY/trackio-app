import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  image: {
    width: 75,
    height: 70,
    borderRadius: 10,
    backgroundColor: "#EEE",
    marginRight: 10,
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
  },

  category: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },

  price: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
  },
});
