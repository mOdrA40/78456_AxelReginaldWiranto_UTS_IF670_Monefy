import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OfflineBannerProps } from '../types/GoalsScreen.types';
import { COLORS } from '../../../constants/theme';
import { styles } from '../styles/GoalsScreen.styles';

/**
 * Komponen untuk menampilkan banner ketika aplikasi dalam mode offline
 */
const OfflineBanner: React.FC<OfflineBannerProps> = ({ isOfflineMode }) => {
  if (!isOfflineMode) return null;

  return (
    <View style={styles.offlineBanner}>
      <Ionicons name="cloud-offline-outline" size={16} color="#fff" />
      <Text style={styles.offlineBannerText}>
        Anda sedang dalam mode offline. Beberapa fitur mungkin tidak berfungsi.
      </Text>
    </View>
  );
};

export default OfflineBanner; 