import React, { useState, useRef, forwardRef, useCallback, memo } from 'react';
import { View, TextInput, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';
import { styles, createInputStyles, getLeftIconStyle, getRightIconStyle } from './Input.styles';
import { InputProps } from './Input.types';

const Input = memo(forwardRef<TextInput, InputProps>(
  (
    {
      label,
      placeholder,
      value,
      onChangeText,
      keyboardType,
      autoCapitalize,
      secureTextEntry,
      error,
      helperText,
      leftIcon,
      rightIcon,
      leftIconColor,
      rightIconColor,
      variant = 'outlined',
      onLeftIconPress,
      onRightIconPress,
      disabled = false,
      prefix,
      maxLength,
      onBlur,
      onFocus,
      testID,
      ...rest
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const animatedValue = useRef(new Animated.Value(0)).current;

    const handleFocus = useCallback((e: any) => {
      setIsFocused(true);
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
      onFocus?.(e);
    }, [onFocus]);

    const handleBlur = useCallback((e: any) => {
      setIsFocused(false);
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
      onBlur?.(e);
    }, [onBlur]);

    const togglePasswordVisibility = useCallback(() => {
      setShowPassword(prev => !prev);
    }, []);

    const hasError = !!error;
    const inputContainerStyle = createInputStyles(variant, isFocused, hasError);
    const leftIconStyle = getLeftIconStyle(!!leftIcon);
    const rightIconStyle = getRightIconStyle(!!rightIcon, !!secureTextEntry);

    const getIconColor = useCallback((defaultColor?: string): string => {
      if (hasError) return COLORS.danger[500];
      if (isFocused) return COLORS.primary.main;
      return defaultColor || COLORS.neutral[400];
    }, [hasError, isFocused]);

    const handleChangeText = useCallback((text: string) => {
      onChangeText?.(text);
    }, [onChangeText]);

    return (
      <View style={styles.wrapper}>
        {label && (
          <Text style={[styles.label, hasError && styles.errorLabel]}>
            {label}
          </Text>
        )}
        <View style={[styles.inputContainer, inputContainerStyle]}>
          {leftIcon && (
            <View style={styles.iconContainer}>
              <Ionicons
                name={leftIcon}
                size={22}
                color={getIconColor(leftIconColor)}
                onPress={onLeftIconPress}
              />
            </View>
          )}

          {prefix && <Text style={styles.prefix}>{prefix}</Text>}

          <TextInput
            ref={ref}
            style={[
              styles.input,
              leftIconStyle,
              rightIconStyle,
              prefix && { paddingLeft: 36 },
            ]}
            placeholder={placeholder}
            value={value}
            onChangeText={handleChangeText}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            secureTextEntry={secureTextEntry && !showPassword}
            onFocus={handleFocus}
            onBlur={handleBlur}
            editable={!disabled}
            placeholderTextColor={COLORS.neutral[400]}
            maxLength={maxLength}
            testID={testID}
            {...rest}
          />

          {rightIcon && !secureTextEntry && (
            <TouchableOpacity
              style={styles.passwordToggle}
              onPress={onRightIconPress}
            >
              <Ionicons
                name={rightIcon}
                size={22}
                color={getIconColor(rightIconColor)}
              />
            </TouchableOpacity>
          )}

          {secureTextEntry && (
            <TouchableOpacity
              style={styles.passwordToggle}
              onPress={togglePasswordVisibility}
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={22}
                color={getIconColor(COLORS.neutral[400])}
              />
            </TouchableOpacity>
          )}
        </View>

        {(helperText || error) && (
          <Text style={[styles.helperText, hasError && styles.errorText]}>
            {hasError ? error : helperText}
          </Text>
        )}
      </View>
    );
  }
));

Input.displayName = 'Input';

export default Input;