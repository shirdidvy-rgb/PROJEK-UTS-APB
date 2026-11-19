import { StyleSheet } from "react-native";
import colors from "./colors";

const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 13,
    paddingHorizontal: 14,
    paddingVertical: 13,
    color: colors.text,
    fontSize: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
    marginTop: 16,
  },
});

export default globalStyles;
