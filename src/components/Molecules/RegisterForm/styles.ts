import { THEME } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  form: {
    gap: 16,
  },
  title: {
    alignSelf: "center",
    fontSize: 20,
    color: THEME.primary[700],
    fontWeight: 700,
    paddingBottom: 20,
  },
  inputsContainer: {
    paddingBottom: 10,
  },
  linkToLogin: {
    alignSelf: "center",
  },
  inputView: {
    gap: 5,
    marginBottom: 2,
  },
});
