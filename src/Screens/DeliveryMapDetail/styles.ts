import { THEME } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  mapArea: {
    flex: 1,
  },

  bottomSheet: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 24,
    backgroundColor: "rgba(255,255,255,0.90)",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 6,
    elevation: 10,
  },

  orderTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: THEME.primary[700],
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    marginTop: 6,
  },

  label: {
    fontSize: 15,
    fontWeight: "500",
    color: THEME.grey[600],
  },

  highlightGreen: {
    fontSize: 15,
    fontWeight: "600",
    color: THEME.green[600],
  },

  highlightBlue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2F80ED",
  },

  highlightRed: {
    fontSize: 15,
    fontWeight: "600",
    color: THEME.primary[800],
  },

  spacer: {
    height: 10,
  },
});
