import React, { memo } from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from '../styles/MainNavigator.styles';

interface TabIconProps {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  size: number;
  focused?: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ name, color, size }) => {
  return (
    <View style={styles.tabIconContainer}>
      <Ionicons name={name} size={size} color={color} />
    </View>
  );
};



export default memo(TabIcon);
