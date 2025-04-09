import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ErrorStateProps } from '../types';
import { styles } from '../styles/TransactionsScreen.styles';
import { COLORS } from '../../../constants/theme';

/**
 * Komponen untuk menampilkan state error
 */
const ErrorState: React.FC<ErrorStateProps> = ({ onRetry }) => {
  return (
    <View style={styles.centered}>
      <Ionicons name="alert-circle" size={48} color={COLORS.danger[500]} />
      <Text style={styles.errorText}>Gagal memuat transaksi</Text>
      <TouchableOpacity
        style={styles.retryButton}
        onPress={onRetry}
      >
        <Text style={styles.retryButtonText}>Coba Lagi</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorState;
