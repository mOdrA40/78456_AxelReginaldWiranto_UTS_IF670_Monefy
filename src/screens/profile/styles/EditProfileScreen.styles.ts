import { StyleSheet, Platform } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '../../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: SPACING.xs,
  },
  title: {
    ...TYPOGRAPHY.h4,
  },
  saveButton: {
    ...TYPOGRAPHY.button,
    fontFamily: TYPOGRAPHY.fontFamily.semiBold,
  },
  content: {
    flex: 1,
  },
  photoSection: {
    alignItems: 'center',
    marginTop: SPACING.xl,
    marginBottom: SPACING.lg,
  },
  photoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    ...TYPOGRAPHY.h2,
    color: '#FFFFFF',
    fontFamily: TYPOGRAPHY.fontFamily.bold,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  photoHint: {
    ...TYPOGRAPHY.caption,
    marginTop: SPACING.sm,
  },
  formSection: {
    padding: SPACING.lg,
  },
  formGroup: {
    marginBottom: SPACING.lg,
  },
  label: {
    ...TYPOGRAPHY.subtitle2,
    marginBottom: SPACING.xs,
  },
  input: {
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    ...TYPOGRAPHY.body1,
  },
  disabledInput: {
  },
  helperText: {
    ...TYPOGRAPHY.caption,
    marginTop: SPACING.xs,
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  photoPickerModal: {
    borderTopLeftRadius: BORDER_RADIUS.lg,
    borderTopRightRadius: BORDER_RADIUS.lg,
    paddingBottom: Platform.OS === 'ios' ? SPACING.xl : SPACING.lg,
    ...SHADOWS.lg,
  },
  photoPickerHeader: {
    borderBottomWidth: 1,
    padding: SPACING.lg,
    alignItems: 'center',
  },
  photoPickerTitle: {
    ...TYPOGRAPHY.h5,
  },
  photoPickerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    borderBottomWidth: 1,
  },
  photoPickerOptionText: {
    ...TYPOGRAPHY.body1,
    marginLeft: SPACING.md,
  },
  cancelButton: {
    padding: SPACING.lg,
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  cancelButtonText: {
    ...TYPOGRAPHY.button,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
  },
});
