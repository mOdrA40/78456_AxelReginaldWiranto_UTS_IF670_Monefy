import React, { memo } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { EmergencyButtonProps } from '../AppLockScreen.types';
import { styles } from '../AppLockScreen.styles';

const EmergencyButton: React.FC<EmergencyButtonProps> = ({ visible, onPress, pressCount }) => {
  if (!visible) return null;

  const getButtonText = () => {
    if (pressCount === 0) return 'Lupa PIN?';
    if (pressCount === 1) return 'Tekan lagi untuk konfirmasi';
    if (pressCount === 2) return 'Tekan sekali lagi untuk reset';
    return 'Memproses...';
  };

  return (
    <Animated.View 
      style={styles.emergencyContainer}
      entering={FadeIn.delay(500)}
    >
      <TouchableOpacity
        style={styles.emergencyButton}
        onPress={onPress}
        disabled={pressCount >= 3}
      >
        <Text style={styles.emergencyButtonText}>
          {getButtonText()}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default memo(EmergencyButton);
