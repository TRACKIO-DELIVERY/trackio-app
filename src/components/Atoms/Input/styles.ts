import { THEME } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 6,
    paddingBottom: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: THEME.grey[400],
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  inputContainer: {
    flex: 1,
  },
});
