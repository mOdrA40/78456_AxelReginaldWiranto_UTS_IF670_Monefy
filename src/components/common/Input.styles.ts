import { StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../constants/theme';

export const createInputStyles = (
  variant: 'outlined' | 'filled' | 'standard',
  isFocused: boolean,
  hasError: boolean
) => {
  const borderColor = hasError
    ? COLORS.danger[500]
    : isFocused
    ? COLORS.primary.main
    : COLORS.neutral[300];

  const backgroundColor = variant === 'filled'
    ? isFocused
      ? COLORS.primary.light + '10' 
      : COLORS.neutral[100]
    : COLORS.white;

  switch (variant) {
    case 'outlined':
      return {
        borderColor,
        backgroundColor,
        borderWidth: 1,
      };
    case 'filled':
      return {
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
        backgroundColor,
      };
    case 'standard':
      return {
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
        backgroundColor: 'transparent',
      };
    default:
      return {};
  }
};

export const getLeftIconStyle = (hasLeftIcon: boolean) => {
  if (!hasLeftIcon) return {};
  
  return {
    paddingLeft: 45,
  };
};

export const getRightIconStyle = (hasRightIcon: boolean, isSecure: boolean) => {
  if (!hasRightIcon && !isSecure) return {};
  
  return {
    paddingRight: 45,
  };
};

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  label: {
    ...TYPOGRAPHY.subtitle2,
    color: COLORS.text,
    marginBottom: SPACING.xs,
    marginLeft: 4,
  },
  errorLabel: {
    color: COLORS.danger[600],
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
    height: 55,
    borderRadius: BORDER_RADIUS.md,
    overflow: 'visible',
  },
  input: {
    ...TYPOGRAPHY.body1,
    color: COLORS.text,
    height: 55,
    width: '100%',
    paddingVertical: 0,
    paddingHorizontal: SPACING.md,
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    zIndex: 1,
  },
  helperText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: 4,
    marginLeft: 4,
  },
  errorText: {
    color: COLORS.danger[600],
  },
  prefix: {
    position: 'absolute',
    left: SPACING.md,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    paddingRight: SPACING.xs,
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text,
    zIndex: 1,
  },
  passwordToggle: {
    position: 'absolute',
    top: 0,
    right: SPACING.sm,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    zIndex: 10,
  },
});
