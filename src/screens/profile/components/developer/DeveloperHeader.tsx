import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { developerStyles as styles } from '../../styles';
import { COLORS } from '../../../../constants/theme';

interface DeveloperHeaderProps {
  onGoBack: () => void;
}

/**
 * Komponen header untuk DeveloperScreen
 */
const DeveloperHeader: React.FC<DeveloperHeaderProps> = ({ onGoBack }) => {
  return (
    <LinearGradient
      colors={[COLORS.primary.dark, COLORS.primary.main]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.header}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={onGoBack}
      >
        <Ionicons name="arrow-back" size={24} color={COLORS.white} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Pengembang</Text>
    </LinearGradient>
  );
};

export default DeveloperHeader;
