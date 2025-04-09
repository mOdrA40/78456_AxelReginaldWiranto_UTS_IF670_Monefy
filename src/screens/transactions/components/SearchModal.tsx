import React from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { SearchModalProps } from '../types';
import { styles } from '../styles/TransactionsScreen.styles';
import { COLORS } from '../../../constants/theme';

/**
 * Komponen modal pencarian transaksi
 */
const SearchModal: React.FC<SearchModalProps> = ({
  visible,
  searchQuery,
  setSearchQuery,
  onClose,
  resultCount
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.searchModalOverlay}>
        <Animated.View 
          entering={FadeInDown.springify().duration(300)}
          style={styles.searchModalContainer}
        >
          <View style={styles.searchModalHeader}>
            <Text style={styles.searchModalTitle}>Cari Transaksi</Text>
            <TouchableOpacity 
              onPress={onClose}
              style={styles.searchModalCloseButton}
            >
              <Ionicons name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.searchModalInputContainer}>
            <Ionicons name="search" size={20} color={COLORS.textSecondary} style={styles.searchModalIcon} />
            <TextInput
              style={styles.searchModalInput}
              placeholder="Ketik untuk mencari transaksi..."
              placeholderTextColor={COLORS.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                style={styles.searchModalClearButton}
                onPress={() => setSearchQuery('')}
              >
                <Ionicons name="close-circle" size={20} color={COLORS.textSecondary} />
              </TouchableOpacity>
            )}
          </View>
          
          {searchQuery.length > 0 && (
            <View style={styles.searchModalResultInfo}>
              <Text style={styles.searchModalResultText}>
                {resultCount} hasil ditemukan
              </Text>
            </View>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default SearchModal;
