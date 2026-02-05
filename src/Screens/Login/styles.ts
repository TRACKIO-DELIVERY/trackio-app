import { THEME } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
  },

  header: {
    marginTop: 40,
    alignItems: "center",
    gap: 12,
  },

  logo: {
    fontSize: 42,
    fontWeight: "800",
    color: THEME.primary[700],
    letterSpacing: 1,
    alignSelf: "center",
  },

  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: THEME.grey[600],
    lineHeight: 22,
  },

  footer: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 20,
    color: THEME.grey[600],
  },
});
