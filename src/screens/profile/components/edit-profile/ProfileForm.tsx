import React from 'react';
import { View, Text, TextInput } from 'react-native';

import { editProfileStyles as styles } from '../../styles';
import { COLORS } from '../../../../constants/theme';

interface ProfileFormProps {
  displayName: string;
  setDisplayName: (value: string) => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  userEmail: string;
  isDarkMode: boolean;
}

/**
 * Komponen form untuk mengedit profil
 */
const ProfileForm: React.FC<ProfileFormProps> = ({
  displayName,
  setDisplayName,
  phoneNumber,
  setPhoneNumber,
  userEmail,
  isDarkMode
}) => {
  return (
    <View style={styles.formSection}>
      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: COLORS.text }]}>Nama</Text>
        <TextInput
          style={[styles.input, { 
            borderColor: COLORS.border, 
            color: COLORS.text,
            backgroundColor: isDarkMode ? COLORS.surface : COLORS.white
          }]}
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="Masukkan nama Anda"
          placeholderTextColor={COLORS.neutral[400]}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: COLORS.text }]}>Email</Text>
        <TextInput
          style={[styles.input, styles.disabledInput, { 
            borderColor: COLORS.border,
            backgroundColor: isDarkMode ? COLORS.neutral[200] : COLORS.neutral[100],
            color: isDarkMode ? COLORS.neutral[400] : COLORS.neutral[500]
          }]}
          value={userEmail || ''}
          editable={false}
          placeholderTextColor={COLORS.neutral[400]}
        />
        <Text style={[styles.helperText, { color: COLORS.textSecondary }]}>
          Email tidak dapat diubah
        </Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: COLORS.text }]}>Nomor Telepon</Text>
        <TextInput
          style={[styles.input, { 
            borderColor: COLORS.border, 
            color: COLORS.text,
            backgroundColor: isDarkMode ? COLORS.surface : COLORS.white
          }]}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Masukkan nomor telepon"
          placeholderTextColor={COLORS.neutral[400]}
          keyboardType="phone-pad"
        />
      </View>
    </View>
  );
};

export default ProfileForm;
