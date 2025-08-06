import { StyleSheet } from "react-native-unistyles";
import { THEME } from "../theme";

export const TYPOGRAPHY = StyleSheet.create({
  inputText: {
    fontSize: 16,
    color: THEME.grey[700],
  },
  buttonText: {
    fontSize: 20,
    color: THEME.grey[100],
  },
  bodyText: {
    fontSize: 15,
    color: THEME.grey[900],
  },
  alertText: {
    fontSize: 13,
    color: THEME.purple[700],
  },
  errorText: {
    fontSize: 13,
    color: THEME.red[500],
  },
  title: {
    fontSize: 24,
    color: THEME.purple[800],
    fontWeight: "bold",
  },
  titleHeader: {
    fontSize: 22,
    color: THEME.grey[900],
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 15,
    color: THEME.grey[800],
  },
  caption: {
    fontSize: 12,
    color: THEME.grey[600],
  },
  muted: {
    fontSize: 14,
    color: THEME.grey[500],
  },
  statusSuccess: {
    fontSize: 14,
    color: THEME.green[600],
  },
  statusWarning: {
    fontSize: 14,
    color: THEME.yellow[700],
  },
  statusInfo: {
    fontSize: 14,
    color: THEME.blue[600],
  },
});
