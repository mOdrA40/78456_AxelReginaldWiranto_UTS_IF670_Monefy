import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
  primary: {
    light: '#4F46E5',
    main: '#4338CA',
    dark: '#3730A3',
    contrast: '#FFFFFF',
  },

  secondary: {
    light: '#10B981',
    main: '#059669',
    dark: '#047857',
    contrast: '#FFFFFF',
  },

  success: {
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#10B981',
    600: '#059669',
    700: '#047857',
    800: '#065F46',
    900: '#064E3B',
  },

  danger: {
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },

  warning: {
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },

  info: {
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },

  neutral: {
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  income: {
    light: '#10B981',
    main: '#059669',
    dark: '#047857',
  },
  expense: {
    light: '#EF4444',
    main: '#DC2626',
    dark: '#B91C1C',
  },

  white: '#FFFFFF',
  black: '#000000',
  background: '#FFFFFF',
  surface: '#F9FAFB',
  text: '#111827',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  card: {
    background: '#FFFFFF',
    border: '#E5E7EB',
  },
};

export const darkCOLORS = {
  primary: {
    light: '#6366F1',
    main: '#4F46E5',
    dark: '#4338CA',
    contrast: '#FFFFFF',
  },

  secondary: {
    light: '#34D399',
    main: '#10B981',
    dark: '#059669',
    contrast: '#FFFFFF',
  },

  success: {
    100: '#064E3B',
    200: '#065F46',
    300: '#047857',
    400: '#059669',
    500: '#10B981',
    600: '#34D399',
    700: '#6EE7B7',
    800: '#A7F3D0',
    900: '#D1FAE5',
  },

  danger: {
    100: '#7F1D1D',
    200: '#991B1B',
    300: '#B91C1C',
    400: '#DC2626',
    500: '#EF4444',
    600: '#F87171',
    700: '#FCA5A5',
    800: '#FECACA',
    900: '#FEE2E2',
  },

  warning: {
    100: '#78350F',
    200: '#92400E',
    300: '#B45309',
    400: '#D97706',
    500: '#F59E0B',
    600: '#FBBF24',
    700: '#FCD34D',
    800: '#FDE68A',
    900: '#FEF3C7',
  },

  info: {
    100: '#1E3A8A',
    200: '#1E40AF',
    300: '#1D4ED8',
    400: '#2563EB',
    500: '#3B82F6',
    600: '#60A5FA',
    700: '#93C5FD',
    800: '#BFDBFE',
    900: '#DBEAFE',
  },

  neutral: {
    100: '#111827',
    200: '#1F2937',
    300: '#374151',
    400: '#4B5563',
    500: '#6B7280',
    600: '#9CA3AF',
    700: '#D1D5DB',
    800: '#E5E7EB',
    900: '#F3F4F6',
  },

  
  income: {
    light: '#10B981',
    main: '#059669',
    dark: '#047857',
  },
  expense: {
    light: '#EF4444',
    main: '#DC2626',
    dark: '#B91C1C',
  },

  white: '#FFFFFF',
  black: '#000000',
  background: '#121212',
  surface: '#1E1E1E',
  text: '#F9FAFB',
  textSecondary: '#D1D5DB',
  border: '#374151',
  card: {
    background: '#1E1E1E',
    border: '#374151',
  },
};

export const TYPOGRAPHY = {
  fontFamily: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semiBold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
  },

  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 30,
    display: 36,
  },

  h1: {
    fontFamily: 'Inter-Bold',
    fontSize: 36,
    lineHeight: 44,
  },
  h2: {
    fontFamily: 'Inter-Bold',
    fontSize: 30,
    lineHeight: 36,
  },
  h3: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    lineHeight: 32,
  },
  h4: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    lineHeight: 28,
  },
  h5: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    lineHeight: 24,
  },
  h6: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    lineHeight: 24,
  },
  subtitle1: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    lineHeight: 24,
  },
  subtitle2: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 20,
  },
  body1: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  body2: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
  },
  button: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 20,
  },
  caption: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 16,
  },
  overline: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    lineHeight: 16,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BORDER_RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  round: 9999,
};

export const SHADOWS = {
  none: {},
  xs: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  xxl: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
  },
};

export const SCREEN = {
  width,
  height,
};

export const LAYOUT = {
  headerHeight: 56,
  bottomTabHeight: 56,
  contentPadding: 16,
  cardPadding: 16,
  inputHeight: 48,
  buttonHeight: 48,
};

export default {
  COLORS,
  darkCOLORS,
  TYPOGRAPHY,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  SCREEN,
  LAYOUT,
};