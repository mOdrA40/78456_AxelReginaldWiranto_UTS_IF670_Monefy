import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { LoadingStateProps } from '../types';
import { styles } from '../styles/TransactionsScreen.styles';
import { COLORS } from '../../../constants/theme';

/**
 * Komponen untuk menampilkan state loading
 */
const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Memuat transaksi...' }) => {
  return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color={COLORS.primary.main} />
      <Text style={styles.loadingText}>{message}</Text>
    </View>
  );
};

export default LoadingState;
