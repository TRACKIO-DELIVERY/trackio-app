import { THEME } from "@/constants/theme";
import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.grey[100],
  },
  image: {
    width: "100%",
    height: 280,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: THEME.grey[400],
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: THEME.grey[900],
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: THEME.grey[700],
    marginBottom: 20,
    lineHeight: 20,
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: THEME.primary[700],
    marginBottom: 25,
  },
  button: {
    backgroundColor: THEME.primary[700],
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: THEME.grey[100],
    fontSize: 16,
    fontWeight: "600",
  },
  quantityContainer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  quantityButtons: {
    backgroundColor: THEME.grey[400],
    flexDirection: "row",
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
    width: 80,
    padding: 10,
  },
  quantityText: {
    fontSize: 20,
  },
});
