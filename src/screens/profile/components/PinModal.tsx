import React from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity } from 'react-native';

import { securityStyles as styles } from '../styles';

interface PinModalProps {
  visible: boolean;
  title: string;
  description: string;
  pin: string;
  setPin: (pin: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
  submitDisabled?: boolean;
  submitText?: string;
  showPinDots?: boolean;
}

/**
 * Komponen modal untuk input PIN
 */
const PinModal: React.FC<PinModalProps> = ({
  visible,
  title,
  description,
  pin,
  setPin,
  onCancel,
  onSubmit,
  submitDisabled = false,
  submitText = 'Verifikasi',
  showPinDots = false
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalDescription}>{description}</Text>
          
          <View style={styles.pinInputContainer}>
            <TextInput
              style={styles.pinInput}
              value={pin}
              onChangeText={setPin}
              keyboardType="numeric"
              maxLength={6}
              secureTextEntry
              autoFocus
              placeholder="Masukkan PIN 6 digit"
            />
          </View>
          
          {showPinDots && (
            <View style={styles.pinHintContainer}>
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <View
                  key={index}
                  style={[
                    styles.pinDot,
                    pin.length > index && styles.pinDotFilled,
                  ]}
                />
              ))}
            </View>
          )}
          
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onCancel}
            >
              <Text style={styles.cancelButtonText}>Batal</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.modalButton, styles.confirmButton]}
              onPress={onSubmit}
              disabled={submitDisabled}
            >
              <Text style={styles.confirmButtonText}>{submitText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PinModal;
