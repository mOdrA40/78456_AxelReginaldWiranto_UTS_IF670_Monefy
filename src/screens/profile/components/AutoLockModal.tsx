import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../../../constants/theme';
import { AutoLockOption } from '../types/index';
import { securityStyles as styles } from '../styles';

interface AutoLockModalProps {
  visible: boolean;
  options: AutoLockOption[];
  currentValue: number;
  onSelect: (value: number) => void;
  onCancel: () => void;
}

/**
 * Komponen modal untuk memilih waktu kunci otomatis
 */
const AutoLockModal: React.FC<AutoLockModalProps> = ({
  visible,
  options,
  currentValue,
  onSelect,
  onCancel
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Waktu Kunci Otomatis</Text>
          <Text style={styles.modalDescription}>
            Pilih berapa lama aplikasi akan terkunci secara otomatis setelah tidak aktif.
          </Text>
          
          <View style={styles.optionList}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.optionItem,
                  currentValue === option.value && styles.selectedOption,
                ]}
                onPress={() => onSelect(option.value)}
              >
                <Text
                  style={[
                    styles.optionText,
                    currentValue === option.value && styles.selectedOptionText,
                  ]}
                >
                  {option.label}
                </Text>
                {currentValue === option.value && (
                  <Ionicons name="checkmark-circle" size={20} color={COLORS.primary.main} />
                )}
              </TouchableOpacity>
            ))}
          </View>
          
          <TouchableOpacity
            style={[styles.fullWidthButton, styles.cancelButton]}
            onPress={onCancel}
          >
            <Text style={styles.cancelButtonText}>Batal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AutoLockModal;
