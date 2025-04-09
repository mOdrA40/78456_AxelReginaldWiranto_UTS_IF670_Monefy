import React, { memo } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { PinKeypadProps } from '../AppLockScreen.types';
import { styles } from '../AppLockScreen.styles';
import { generateKeypadRows, triggerKeypadHaptic } from '../AppLockScreen.utils';
import { COLORS } from '../../../../constants/theme';

const PinKeypad: React.FC<PinKeypadProps> = ({
  onKeyPress,
  onDelete,
  onBiometricPress,
  showBiometric,
  isAuthenticating
}) => {
  const keypadRows = generateKeypadRows();

  const handleKeyPress = (key: string) => {
    triggerKeypadHaptic();
    
    if (key === 'delete') {
      onDelete();
    } else if (key !== '') {
      onKeyPress(key);
    }
  };

  return (
    <View style={styles.keypadContainer}>
      {keypadRows.map((row, rowIndex) => (
        <Animated.View
          key={`row-${rowIndex}`}
          style={styles.keypadRow}
          entering={FadeInUp.delay(rowIndex * 100 + 300)}
        >
          {row.map((key, keyIndex) => {
            if (key === '' && rowIndex === 3 && keyIndex === 0 && showBiometric) {
              return (
                <TouchableOpacity
                  key={`key-${rowIndex}-${keyIndex}`}
                  style={styles.biometricButton}
                  onPress={onBiometricPress}
                  disabled={isAuthenticating}
                >
                  {isAuthenticating ? (
                    <ActivityIndicator color={COLORS.white} size="large" />
                  ) : (
                    <Ionicons name="finger-print" size={32} color={COLORS.white} />
                  )}
                </TouchableOpacity>
              );
            }
            
            
            if (key === 'delete') {
              return (
                <TouchableOpacity
                  key={`key-${rowIndex}-${keyIndex}`}
                  style={styles.deleteButton}
                  onPress={() => handleKeyPress(key)}
                >
                  <Ionicons name="backspace-outline" size={28} color={COLORS.white} />
                </TouchableOpacity>
              );
            }
            
            if (key === '') {
              return (
                <View
                  key={`key-${rowIndex}-${keyIndex}`}
                  style={{ width: styles.keyButton.width, height: styles.keyButton.height, margin: 8 }}
                />
              );
            }
            
            return (
              <TouchableOpacity
                key={`key-${rowIndex}-${keyIndex}`}
                style={styles.keyButton}
                onPress={() => handleKeyPress(key)}
              >
                <Text style={styles.keyButtonText}>{key}</Text>
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      ))}
    </View>
  );
};

export default memo(PinKeypad);
