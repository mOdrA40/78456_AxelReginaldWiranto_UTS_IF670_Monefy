import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import styles from './Button.styles';
import { ButtonProps } from './Button.types';
import { COLORS } from '../../constants/theme';
import { BORDER_RADIUS } from '../../constants/theme';

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  type = 'solid',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  useGradient = false,
  gradientColors,
  ...rest
}) => {
  const buttonStyles = [
    styles.container,
    styles[type],
    styles[size],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${type}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  const getBorderRadius = (): number => {
    if (style && typeof style === 'object' && 'borderRadius' in style) {
      return (style as ViewStyle).borderRadius as number;
    }
    return BORDER_RADIUS.lg;
  };
  
  const borderRadius = getBorderRadius();

  const buttonContent = (
    <>
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={type === 'solid' ? '#fff' : COLORS.primary.main}
        />
      ) : (
        <View style={styles.buttonContentContainer}>
          {leftIcon && (
            <View style={styles.leftIconContainer}>
              {typeof leftIcon === 'string' ? (
                <Ionicons
                  name={leftIcon as keyof typeof Ionicons.glyphMap}
                  size={size === 'small' ? 18 : size === 'medium' ? 20 : 24}
                  color={type === 'solid' ? '#fff' : COLORS.primary.main}
                  style={styles.icon}
                />
              ) : (
                leftIcon
              )}
            </View>
          )}

          <Text style={textStyles}>{title}</Text>

          {rightIcon && (
            <View style={styles.rightIconContainer}>
              {typeof rightIcon === 'string' ? (
                <Ionicons
                  name={rightIcon as keyof typeof Ionicons.glyphMap}
                  size={size === 'small' ? 18 : size === 'medium' ? 20 : 24}
                  color={type === 'solid' ? '#fff' : COLORS.primary.main}
                  style={styles.icon}
                />
              ) : (
                rightIcon
              )}
            </View>
          )}
        </View>
      )}
    </>
  );

  if (useGradient && type === 'solid' && !disabled) {
    const defaultColors: [string, string] = [COLORS.primary.main, COLORS.primary.dark];
    const colors = gradientColors && gradientColors.length >= 2 
      ? (gradientColors as [string, string, ...string[]]) 
      : defaultColors;
      
    const containerStyle = { borderRadius };

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={disabled || isLoading ? undefined : onPress}
        style={containerStyle}
        disabled={disabled || isLoading}
        {...rest}
      >
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[buttonStyles, { overflow: 'hidden' }]}
        >
          {buttonContent}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={disabled || isLoading ? undefined : onPress}
      style={buttonStyles}
      disabled={disabled || isLoading}
      {...rest}
    >
      {buttonContent}
    </TouchableOpacity>
  );
};

export default Button;