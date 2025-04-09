import { StyleSheet, Dimensions, Platform } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../../../constants/theme';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerContainer: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xs,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.md,
    marginTop: SPACING.md,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: SPACING.sm,
  },
  appName: {
    ...TYPOGRAPHY.h1,
    color: COLORS.primary.main,
  },
  formContainer: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.primary.main,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  inputContainer: {
    marginBottom: SPACING.md,
    position: 'relative',
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordVisibilityButton: {
    position: 'absolute',
    right: 15,
    top: 38,
    zIndex: 1,
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsContainer: {
    marginVertical: SPACING.md,
    alignItems: 'center',
  },
  termsText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  termsLinksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: SPACING.xs,
  },
  termsLink: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primary.main,
    fontWeight: 'bold',
  },
  registerButton: {
    marginTop: SPACING.sm,
  },
  gradientButton: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  buttonContent: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.white,
    fontSize: 16,
    letterSpacing: 0.5,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  loginText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
  },
  loginLink: {
    ...TYPOGRAPHY.button,
    color: COLORS.primary.main,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingContainer: {
    backgroundColor: COLORS.white,
    padding: SPACING.xl,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
    ...SHADOWS.md,
  },
  loadingText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.text,
    marginTop: SPACING.md,
    fontWeight: 'bold',
  },
});
