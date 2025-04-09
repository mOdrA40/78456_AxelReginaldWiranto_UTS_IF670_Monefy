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
    padding: SPACING.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.xl,
  },
  emptyImage: {
    width: 120,
    height: 120,
    marginBottom: SPACING.lg,
    opacity: 0.7,
  },
  emptyTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
    textAlign: "center",
    marginBottom: SPACING.sm,
  },
  emptyText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.neutral[500],
    textAlign: "center",
    marginBottom: SPACING.lg,
  },
  notificationItem: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  notificationItemUnread: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary.main,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.primary.light,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  textContainer: {
    flex: 1,
  },
  notificationTitle: {
    ...TYPOGRAPHY.subtitle1,
    color: COLORS.text,
    marginBottom: 2,
  },
  notificationMessage: {
    ...TYPOGRAPHY.body2,
    color: COLORS.neutral[600],
    marginBottom: SPACING.xs,
  },
  notificationTime: {
    ...TYPOGRAPHY.caption,
    color: COLORS.neutral[500],
  },
  deleteButton: {
    padding: SPACING.xs,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  headerActionButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  settingContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  settingTitle: {
    ...TYPOGRAPHY.subtitle1,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SPACING.xs,
  },
  settingLabel: {
    ...TYPOGRAPHY.body2,
    color: COLORS.neutral[800],
    flex: 1,
  },
  permissionButton: {
    backgroundColor: COLORS.primary.main,
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  permissionButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.white,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.surface,
    marginBottom: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.xs,
  },
  tabButton: {
    flex: 1,
    paddingVertical: SPACING.sm,
    alignItems: "center",
    borderRadius: BORDER_RADIUS.sm,
  },
  activeTab: {
    backgroundColor: COLORS.primary.main,
  },
  tabText: {
    ...TYPOGRAPHY.button,
    color: COLORS.neutral[600],
  },
  activeTabText: {
    color: COLORS.white,
  },
  headerBar: {
    height: 4,
    width: 40,
    borderRadius: 2,
    backgroundColor: COLORS.neutral[300],
    alignSelf: "center",
    marginTop: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  bottomSheet: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: BORDER_RADIUS.lg,
    borderTopRightRadius: BORDER_RADIUS.lg,
    paddingBottom: SPACING.xl,
  },
  filterOption: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral[200],
  },
  filterOptionText: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text,
  },
  activeFilterText: {
    color: COLORS.primary.main,
  },
}); 