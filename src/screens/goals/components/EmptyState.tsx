import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EmptyStateProps } from '../types/GoalsScreen.types';
import { COLORS } from '../../../constants/theme';
import { styles } from '../styles/GoalsScreen.styles';

/**
 * Komponen untuk menampilkan state kosong pada halaman tujuan
 */
const EmptyState: React.FC<EmptyStateProps> = ({ onAddGoal }) => {
  return (
    <View style={styles.emptyContainer}>
      <Ionicons 
        name="wallet-outline" 
        size={100} 
        color={COLORS.neutral[300]} 
        style={{ marginBottom: 20 }}
      />
      
      <Text style={styles.emptyTitle}>
        Belum Ada Tujuan
      </Text>
      
      <Text style={styles.emptyDescription}>
        Buat tujuan keuangan Anda yang pertama dan mulai langkah menuju kebebasan finansial!
      </Text>
      
      <TouchableOpacity
        style={styles.emptyButton}
        onPress={onAddGoal}
      >
        <Ionicons name="add-circle-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.emptyButtonText}>Buat Tujuan Baru</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyState; 