import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../../../constants/theme';

const { width } = Dimensions.get('window');
const keySize = width / 5;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  gradient: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: SPACING.xxl,
    paddingBottom: SPACING.xl,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
    ...SHADOWS.md,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.white,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  subtitle: {
    ...TYPOGRAPHY.body2,
    color: COLORS.white,
    opacity: 0.8,
    textAlign: 'center',
  },
  pinContainer: {
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  pinDotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  pinDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 8,
  },
  pinDotFilled: {
    backgroundColor: COLORS.white,
  },
  errorMessage: {
    ...TYPOGRAPHY.body2,
    color: COLORS.danger[300],
    marginTop: SPACING.md,
    textAlign: 'center',
  },
  keypadContainer: {
    paddingHorizontal: SPACING.lg,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.md,
  },
  keyButton: {
    width: keySize,
    height: keySize,
    borderRadius: keySize / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  keyButtonText: {
    ...TYPOGRAPHY.h2,
    color: COLORS.white,
  },
  deleteButton: {
    width: keySize,
    height: keySize,
    borderRadius: keySize / 2,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  biometricButton: {
    width: keySize,
    height: keySize,
    borderRadius: keySize / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  emergencyContainer: {
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  emergencyButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  emergencyButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.white,
    opacity: 0.8,
  },
});
