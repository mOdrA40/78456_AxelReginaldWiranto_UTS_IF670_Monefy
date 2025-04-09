import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ErrorStateProps } from '../types/GoalsScreen.types';
import { COLORS } from '../../../constants/theme';
import { styles } from '../styles/GoalsScreen.styles';

/**
 * Komponen untuk menampilkan state error pada halaman tujuan
 */
const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <View style={styles.errorContainer}>
      <Ionicons name="alert-circle-outline" size={60} color={COLORS.danger[500]} />
      
      <Text style={styles.errorTitle}>
        Terjadi Kesalahan
      </Text>
      
      <Text style={styles.errorDescription}>
        {error || 'Gagal memuat data tujuan keuangan. Silakan coba lagi.'}
      </Text>
      
      <TouchableOpacity
        style={styles.retryButton}
        onPress={onRetry}
      >
        <Ionicons name="refresh-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.retryButtonText}>Coba Lagi</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorState; 