import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../../../constants/theme';

// Get screen dimensions for responsive design
const { width } = Dimensions.get('window');
const isTablet = width >= 768;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: isTablet ? SPACING.xl : SPACING.lg,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.xxxl : TYPOGRAPHY.fontSize.xl,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: isTablet ? SPACING.xl : SPACING.lg,
    paddingBottom: SPACING.xl * 2, // Extra padding
    maxWidth: isTablet ? 700 : undefined,
    alignSelf: isTablet ? 'center' : undefined,
    width: isTablet ? '100%' : undefined,
  },
  profileCard: {
    margin: isTablet ? SPACING.xl : SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.md,
    padding: isTablet ? SPACING.xl : SPACING.lg,
    overflow: 'hidden',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: isTablet ? 100 : 70,
    height: isTablet ? 100 : 70,
    borderRadius: isTablet ? 50 : 35,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: isTablet ? SPACING.lg : SPACING.md,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  profileImage: {
    width: isTablet ? 100 : 70,
    height: isTablet ? 100 : 70,
    borderRadius: isTablet ? 50 : 35,
  },
  avatarText: {
    ...TYPOGRAPHY.h2,
    color: COLORS.white,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.xxxl : TYPOGRAPHY.fontSize.xl,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    ...TYPOGRAPHY.h3,
    color: COLORS.white,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    marginBottom: isTablet ? SPACING.sm : SPACING.xs,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.xl : TYPOGRAPHY.fontSize.lg,
  },
  userEmail: {
    ...TYPOGRAPHY.body2,
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: isTablet ? TYPOGRAPHY.fontSize.md : TYPOGRAPHY.fontSize.sm,
  },
  userHint: {
    ...TYPOGRAPHY.caption,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: isTablet ? SPACING.sm : SPACING.xs,
    fontSize: isTablet ? 12 : 10,
    fontStyle: 'italic',
  },
  editButton: {
    width: isTablet ? 48 : 36,
    height: isTablet ? 48 : 36,
    borderRadius: isTablet ? 24 : 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  profileActions: {
    flexDirection: 'row',
    marginTop: isTablet ? SPACING.xl : SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
    paddingTop: isTablet ? SPACING.lg : SPACING.md,
    justifyContent: 'space-around',
  },
  profileActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: isTablet ? SPACING.md : SPACING.sm,
  },
  profileActionText: {
    ...TYPOGRAPHY.button,
    color: COLORS.white,
    marginLeft: isTablet ? SPACING.sm : SPACING.xs,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.md : TYPOGRAPHY.fontSize.sm,
  },
  actionDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  menuContainer: {
    margin: isTablet ? SPACING.xl : SPACING.lg,
    marginTop: 0,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.sm,
    overflow: 'hidden',
    maxWidth: isTablet ? 700 : undefined,
    alignSelf: isTablet ? 'center' : undefined,
    width: isTablet ? '100%' : undefined,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: isTablet ? SPACING.xl : SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemIcon: {
    width: isTablet ? 48 : 40,
    height: isTablet ? 48 : 40,
    borderRadius: isTablet ? 24 : 20,
    backgroundColor: COLORS.primary.main + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: isTablet ? SPACING.lg : SPACING.md,
  },
  dangerIcon: {
    backgroundColor: COLORS.danger[600] + '20',
  },
  menuItemTextContainer: {
    flex: 1,
  },
  menuItemTitle: {
    ...TYPOGRAPHY.subtitle1,
    color: COLORS.text,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.lg : TYPOGRAPHY.fontSize.md,
  },
  dangerText: {
    color: COLORS.danger[600],
  },
  menuItemSubtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: isTablet ? SPACING.sm : SPACING.xs,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.sm : TYPOGRAPHY.fontSize.xs,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  version: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginVertical: isTablet ? SPACING.xxl : SPACING.xl,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.sm : TYPOGRAPHY.fontSize.xs,
  },
});
