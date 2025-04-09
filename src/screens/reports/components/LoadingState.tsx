import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { styles } from '../styles/ReportsScreen.styles';
import { COLORS } from '../../../constants/theme';

/**
 * Komponen untuk menampilkan state loading
 */
const LoadingState: React.FC = () => {
  return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color={COLORS.primary.main} />
      <Text style={styles.loadingText}>Memuat laporan...</Text>
    </View>
  );
};

export default LoadingState;
