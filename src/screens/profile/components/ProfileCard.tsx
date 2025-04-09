import React, { useRef } from 'react';
import { View, Text, Image } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

import { COLORS } from '../../../constants/theme';
import { profileStyles as styles } from '../styles';

interface ProfileCardProps {
  userName: string;
  userEmail: string;
  photoURL?: string | null;
  onEditProfile?: () => void;
  onNavigateToNotifications?: () => void;
}

/**
 * Komponen untuk menampilkan kartu profil pengguna dengan animasi yang dioptimalkan
 * untuk mencegah double render
 */
const ProfileCard: React.FC<ProfileCardProps> = ({
  userName,
  userEmail,
  photoURL
}) => {
  // Menggunakan useRef untuk menandai apakah animasi sudah dijalankan
  const hasAnimated = useRef(false);
  
  return (
    <Animated.View
      entering={hasAnimated.current ? undefined : FadeInDown.delay(100).springify()}
      onLayout={() => {
        // Setelah komponen di-render pertama kali, tandai animasi sudah berjalan
        hasAnimated.current = true;
      }}
    >
      <LinearGradient
        colors={[COLORS.primary.light, COLORS.primary.main, COLORS.primary.dark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.profileCard}
      >
        <View style={styles.profileInfo}>
          <View style={styles.avatarContainer}>
            {photoURL ? (
              <Image source={{ uri: photoURL }} style={styles.profileImage} />
            ) : (
              <Text style={styles.avatarText}>
                {userName?.charAt(0) || userEmail?.charAt(0) || 'U'}
              </Text>
            )}
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              {userName || 'Pengguna'}
            </Text>
            <Text style={styles.userEmail}>{userEmail}</Text>
            <Text style={styles.userHint}>Gunakan menu di bawah untuk mengelola profil</Text>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

export default React.memo(ProfileCard);
