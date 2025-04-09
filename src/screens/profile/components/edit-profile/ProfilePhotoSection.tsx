import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { editProfileStyles as styles } from '../../styles';
import { COLORS } from '../../../../constants/theme';

interface ProfilePhotoSectionProps {
  photoURL?: string | null;
  profileImage: string | null;
  userName: string;
  userEmail: string;
  onPhotoPress: () => void;
}

/**
 * Komponen untuk menampilkan dan mengedit foto profil
 */
const ProfilePhotoSection: React.FC<ProfilePhotoSectionProps> = ({
  photoURL,
  profileImage,
  userName,
  userEmail,
  onPhotoPress
}) => {
  return (
    <View style={styles.photoSection}>
      <TouchableOpacity 
        style={styles.photoContainer}
        onPress={onPhotoPress}
      >
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : photoURL ? (
          <Image source={{ uri: photoURL }} style={styles.profileImage} />
        ) : (
          <View style={[styles.avatarPlaceholder, { backgroundColor: COLORS.primary.main }]}>
            <Text style={styles.avatarText}>
              {userName?.charAt(0) || userEmail?.charAt(0) || 'U'}
            </Text>
          </View>
        )}
        <View style={[styles.cameraButton, { backgroundColor: COLORS.primary.main }]}>
          <Ionicons name="camera" size={16} color={COLORS.white} />
        </View>
      </TouchableOpacity>
      <Text style={[styles.photoHint, { color: COLORS.textSecondary }]}>
        Ketuk untuk mengubah foto profil
      </Text>
    </View>
  );
};

export default ProfilePhotoSection;
