import { StyleSheet } from "react-native";
import { THEME } from "../theme";

export const TYPOGRAPHY = StyleSheet.create({
  inputText: {
    fontFamily: "Sen_400Regular",
    fontSize: 16,
    color: THEME.grey[700],
  },
  buttonText: {
    fontFamily: "Sen_500Medium",
    fontSize: 20,
    color: THEME.grey[100],
  },
  bodyText: {
    fontFamily: "Sen_400Regular",
    fontSize: 15,
    color: THEME.grey[900],
  },
  alertText: {
    fontFamily: "Sen_400Regular",
    fontSize: 13,
    color: THEME.purple[700],
  },
  errorText: {
    fontFamily: "Sen_400Regular",
    fontSize: 13,
    color: THEME.red[500],
  },
});
