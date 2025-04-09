import React from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import { TypeFilterButtonsProps } from '../types';
import { styles } from '../styles/TransactionsScreen.styles';

/**
 * Komponen untuk menampilkan tombol filter tipe transaksi
 */
const TypeFilterButtons: React.FC<TypeFilterButtonsProps> = ({ 
  activeFilter, 
  setActiveFilter 
}) => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.typeFilterButtonsContainer}
    >
      <TouchableOpacity
        style={[
          styles.typeFilterButton,
          activeFilter === 'semua' && styles.activeTypeFilterButton,
        ]}
        onPress={() => setActiveFilter('semua')}
      >
        <Text
          style={[
            styles.typeFilterButtonText,
            activeFilter === 'semua' && styles.activeTypeFilterButtonText,
          ]}
        >
          Semua
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.typeFilterButton,
          activeFilter === 'pemasukan' && styles.activeTypeFilterButton,
        ]}
        onPress={() => setActiveFilter('pemasukan')}
      >
        <Text
          style={[
            styles.typeFilterButtonText,
            activeFilter === 'pemasukan' && styles.activeTypeFilterButtonText,
          ]}
        >
          Pemasukan
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.typeFilterButton,
          activeFilter === 'pengeluaran' && styles.activeTypeFilterButton,
        ]}
        onPress={() => setActiveFilter('pengeluaran')}
      >
        <Text
          style={[
            styles.typeFilterButtonText,
            activeFilter === 'pengeluaran' && styles.activeTypeFilterButtonText,
          ]}
        >
          Pengeluaran
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default TypeFilterButtons;
