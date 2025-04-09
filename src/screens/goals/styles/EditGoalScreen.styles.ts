import { StyleSheet } from "react-native";
import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
} from "../../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text,
    marginLeft: SPACING.sm,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
    paddingBottom: SPACING.xl * 2,
  },
  formContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    ...SHADOWS.sm,
  },
  formTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  inputGroup: {
    marginBottom: SPACING.md,
  },
  label: {
    ...TYPOGRAPHY.subtitle2,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },

  // Currency input styles
  currencyInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.neutral[300],
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.md,
    height: 50,
  },
  currencySymbol: {
    ...TYPOGRAPHY.body1,
    color: COLORS.neutral[700],
    marginRight: SPACING.xs,
  },
  currencyInput: {
    flex: 1,
    ...TYPOGRAPHY.body1,
    color: COLORS.text,
    padding: 0,
    height: "100%",
  },
  errorText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.danger[500],
    marginTop: SPACING.xs,
  },
  iconSelector: {
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: SPACING.sm,
    justifyContent: "space-between",
  },
  iconOption: {
    width: "23%",
    padding: SPACING.xs,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.neutral[100],
    height: 90,
    elevation: 1,
    shadowColor: COLORS.neutral[400],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  selectedOption: {
    backgroundColor: COLORS.primary.main,
    elevation: 3,
    shadowColor: COLORS.primary.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  iconLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text,
    marginTop: SPACING.xs,
    textAlign: "center",
    fontSize: 11,
    width: "100%",
    paddingHorizontal: 2,
  },
  selectedLabel: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  colorsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: SPACING.md,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  selectedColorOption: {
    borderWidth: 2,
    borderColor: COLORS.text,
  },
  footer: {
    padding: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.surface,
    ...SHADOWS.md,
  },
  deleteButton: {
    backgroundColor: COLORS.danger[500],
    marginTop: SPACING.md,
  },
});
