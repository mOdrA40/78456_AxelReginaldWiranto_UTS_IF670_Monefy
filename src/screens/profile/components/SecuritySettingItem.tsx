import React from 'react';
import { View, Text, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../../../constants/theme';
import { securityStyles as styles } from '../styles';

interface SecuritySettingItemProps {
  icon: string;
  title: string;
  description: string;
  value: boolean;
  onValueChange: () => void;
  disabled?: boolean;
  iconColor?: string;
}

/**
 * Komponen untuk menampilkan item pengaturan keamanan
 */
const SecuritySettingItem: React.FC<SecuritySettingItemProps> = ({
  icon,
  title,
  description,
  value,
  onValueChange,
  disabled = false,
  iconColor = COLORS.primary.main
}) => {
  return (
    <View style={styles.settingItem}>
      <View style={styles.settingTitleContainer}>
        <Ionicons 
          name={icon as any} 
          size={22} 
          color={disabled ? COLORS.neutral[400] : iconColor} 
          style={styles.settingIcon}
        />
        <View>
          <Text style={[styles.settingTitle, disabled && styles.disabledText]}>
            {title}
          </Text>
          <Text style={[styles.settingDescription, disabled && styles.disabledText]}>
            {description}
          </Text>
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{ false: COLORS.neutral[300], true: COLORS.primary.main + '80' }}
        thumbColor={value ? COLORS.primary.main : COLORS.neutral[100]}
      />
    </View>
  );
};

export default SecuritySettingItem;
