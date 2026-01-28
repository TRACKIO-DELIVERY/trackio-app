import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },

  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    alignContent: "center",
  },

  roleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  roleTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 24,
    color: "#111",
  },

  roleButtons: {
    width: "100%",
    gap: 12,
  },
});
