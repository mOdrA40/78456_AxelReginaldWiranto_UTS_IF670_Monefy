import { StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    marginRight: SPACING.md,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text,
  },
  content: {
    flex: 1,
  },
  infoCard: {
    margin: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    ...SHADOWS.md,
  },
  infoCardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  infoTextContainer: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  infoTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  infoDescription: {
    ...TYPOGRAPHY.body2,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  sectionContainer: {
    margin: SPACING.lg,
    marginBottom: 0,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.sm,
    overflow: 'hidden',
  },
  sectionTitle: {
    ...TYPOGRAPHY.subtitle1,
    color: COLORS.text,
    padding: SPACING.md,
    paddingBottom: 0,
    marginBottom: SPACING.xs,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: SPACING.md,
    width: 24,
    textAlign: 'center',
  },
  settingTitle: {
    ...TYPOGRAPHY.subtitle2,
    color: COLORS.text,
  },
  disabledText: {
    color: COLORS.neutral[400],
  },
  settingDescription: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  settingActionButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    marginLeft: SPACING.xl + SPACING.md,
    marginBottom: SPACING.md,
  },
  settingActionText: {
    ...TYPOGRAPHY.button,
    color: COLORS.primary.main,
  },
  settingValueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    marginLeft: SPACING.xl + SPACING.md,
    marginBottom: SPACING.md,
  },
  settingValueLabel: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
  },
  settingValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValueText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.primary.main,
    marginRight: SPACING.xs,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: BORDER_RADIUS.lg,
    borderTopRightRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    paddingTop: SPACING.xl,
  },
  modalTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  modalDescription: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  pinInputContainer: {
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  pinInput: {
    ...TYPOGRAPHY.h3,
    width: '80%',
    textAlign: 'center',
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    color: COLORS.text,
  },
  pinHintContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  pinDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.neutral[200],
    marginHorizontal: 6,
  },
  pinDotFilled: {
    backgroundColor: COLORS.primary.main,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    marginHorizontal: SPACING.xs,
  },
  cancelButton: {
    backgroundColor: COLORS.neutral[200],
  },
  confirmButton: {
    backgroundColor: COLORS.primary.main,
  },
  cancelButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.textSecondary,
  },
  confirmButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.white,
  },
  optionList: {
    marginBottom: SPACING.lg,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  selectedOption: {
    backgroundColor: COLORS.primary.main + '10',
  },
  optionText: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text,
  },
  selectedOptionText: {
    color: COLORS.primary.main,
    fontFamily: TYPOGRAPHY.fontFamily.semiBold,
  },
  fullWidthButton: {
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
  },
  bottomSpacer: {
    height: 100, // Memberi space yang cukup
    marginBottom: SPACING.lg,
  },
});
