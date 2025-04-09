import { StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../../../constants/theme';

export const createStyles = (isTablet: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: isTablet ? SPACING.xxl : SPACING.xl,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: isTablet ? SPACING.xl : SPACING.lg,
  },
  errorIconContainer: {
    marginBottom: isTablet ? SPACING.xl : SPACING.lg,
  },
  errorTitle: {
    fontSize: isTablet ? 30 : 24,
    fontWeight: 'bold',
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.danger[500],
    marginBottom: isTablet ? SPACING.md : SPACING.sm,
  },
  errorMessage: {
    fontSize: isTablet ? TYPOGRAPHY.fontSize.lg : TYPOGRAPHY.fontSize.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: isTablet ? SPACING.xl : SPACING.lg,
    lineHeight: isTablet ? 28 : 24,
    maxWidth: isTablet ? 500 : undefined,
  },
  errorButton: {
    marginTop: isTablet ? SPACING.xl : SPACING.lg,
    width: '100%',
    maxWidth: isTablet ? 400 : 300,
  },
  backToLoginButton: {
    marginTop: isTablet ? SPACING.xl : SPACING.lg,
    padding: isTablet ? SPACING.md : SPACING.sm,
  },
  backToLoginText: {
    color: COLORS.primary.main,
    fontSize: isTablet ? TYPOGRAPHY.fontSize.lg : TYPOGRAPHY.fontSize.md,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: isTablet ? SPACING.xl : SPACING.lg,
  },
  successIcon: {
    marginBottom: isTablet ? SPACING.xl : SPACING.lg,
  },
  successTitle: {
    fontSize: isTablet ? 30 : 24,
    fontWeight: 'bold',
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.success[500],
    marginBottom: isTablet ? SPACING.md : SPACING.sm,
  },
  successMessage: {
    fontSize: isTablet ? TYPOGRAPHY.fontSize.lg : TYPOGRAPHY.fontSize.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: isTablet ? SPACING.xl : SPACING.lg,
    lineHeight: isTablet ? 28 : 24,
    maxWidth: isTablet ? 500 : undefined,
  },
  resetButton: {
    marginTop: isTablet ? SPACING.xl : SPACING.lg,
    width: '100%',
    maxWidth: isTablet ? 400 : 300,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: isTablet ? SPACING.xl : SPACING.lg,
    paddingHorizontal: isTablet ? SPACING.xl : SPACING.lg,
  },
  backButton: {
    padding: isTablet ? SPACING.md : SPACING.sm,
    marginRight: isTablet ? SPACING.md : SPACING.sm,
    borderRadius: BORDER_RADIUS.round,
    ...SHADOWS.xs,
  },
  title: {
    fontSize: isTablet ? TYPOGRAPHY.fontSize.xxxl : TYPOGRAPHY.fontSize.xxl,
    fontWeight: 'bold',
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.text,
  },
  subtitle: {
    fontSize: isTablet ? TYPOGRAPHY.fontSize.lg : TYPOGRAPHY.fontSize.md,
    color: COLORS.textSecondary,
    marginBottom: isTablet ? SPACING.xl : SPACING.lg,
    paddingHorizontal: isTablet ? SPACING.xl : SPACING.lg,
    lineHeight: isTablet ? 28 : 24,
  },
  formContainer: {
    padding: isTablet ? SPACING.xl : SPACING.lg,
    backgroundColor: COLORS.surface,
    marginHorizontal: isTablet ? SPACING.xl : SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.sm,
  },
  inputContainer: {
    marginBottom: isTablet ? SPACING.lg : SPACING.md,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: isTablet ? SPACING.xl : SPACING.lg,
  },
  loginText: {
    fontSize: isTablet ? TYPOGRAPHY.fontSize.lg : TYPOGRAPHY.fontSize.md,
    color: COLORS.textSecondary,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
  },
  loginLink: {
    fontSize: isTablet ? TYPOGRAPHY.fontSize.lg : TYPOGRAPHY.fontSize.md,
    color: COLORS.primary.main,
    fontWeight: 'bold',
    fontFamily: TYPOGRAPHY.fontFamily.bold,
  },
  submitButton: {
    marginTop: isTablet ? SPACING.lg : SPACING.md,
  },
}); 