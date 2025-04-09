import React, { memo } from 'react';
import { View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { PinDisplayProps } from '../AppLockScreen.types';
import { styles } from '../AppLockScreen.styles';

const PinDisplay: React.FC<PinDisplayProps> = ({ pinLength, maxLength }) => {
  const dots = Array.from({ length: maxLength }, (_, index) => (
    <Animated.View
      key={index}
      entering={FadeIn.delay(index * 100)}
      style={[
        styles.pinDot,
        index < pinLength && styles.pinDotFilled
      ]}
    />
  ));

  return (
    <View style={styles.pinDotsContainer}>
      {dots}
    </View>
  );
};

export default memo(PinDisplay);
