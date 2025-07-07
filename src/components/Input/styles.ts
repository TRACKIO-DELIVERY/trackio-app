import { THEME } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: THEME.grey[400],
  },
  inputContainer: {
    flex: 1,
  },
});
