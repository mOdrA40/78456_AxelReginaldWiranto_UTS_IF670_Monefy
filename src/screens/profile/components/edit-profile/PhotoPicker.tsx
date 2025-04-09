import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

import { editProfileStyles as styles } from '../../styles';
import { COLORS } from '../../../../constants/theme';

interface PhotoPickerProps {
  visible: boolean;
  onClose: () => void;
  onTakePhoto: () => void;
  onPickImage: () => void;
}

/**
 * Komponen modal untuk memilih foto profil
 */
const PhotoPicker: React.FC<PhotoPickerProps> = ({
  visible,
  onClose,
  onTakePhoto,
  onPickImage
}) => {
  if (!visible) return null;

  return (
    <View style={styles.modalOverlay}>
      <BlurView intensity={10} style={StyleSheet.absoluteFill} />
      <Animated.View
        entering={FadeInUp.springify()}
        style={[styles.photoPickerModal, { backgroundColor: COLORS.surface }]}
      >
        <View style={[styles.photoPickerHeader, { borderBottomColor: COLORS.border }]}>
          <Text style={[styles.photoPickerTitle, { color: COLORS.text }]}>Foto Profil</Text>
        </View>
        
        <TouchableOpacity 
          style={[styles.photoPickerOption, { borderBottomColor: COLORS.border }]} 
          onPress={onTakePhoto}
        >
          <Ionicons name="camera" size={24} color={COLORS.primary.main} />
          <Text style={[styles.photoPickerOptionText, { color: COLORS.text }]}>Ambil Foto</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.photoPickerOption, { borderBottomColor: COLORS.border }]} 
          onPress={onPickImage}
        >
          <Ionicons name="images" size={24} color={COLORS.primary.main} />
          <Text style={[styles.photoPickerOptionText, { color: COLORS.text }]}>Pilih dari Galeri</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={onClose}
        >
          <Text style={[styles.cancelButtonText, { color: COLORS.danger[600] }]}>Batal</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default PhotoPicker;
