import { TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type InputVariant = 'outlined' | 'filled' | 'standard';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: InputVariant;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  leftIconColor?: string;
  rightIconColor?: string;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
  disabled?: boolean;
  prefix?: string;
  touched?: boolean;
  fullWidth?: boolean;
  containerStyle?: any;
  inputStyle?: any;
  labelStyle?: any;
  errorStyle?: any;
}
