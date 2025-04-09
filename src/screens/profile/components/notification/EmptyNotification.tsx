import React from 'react';
import { View, Text } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

// Style
import { notificationsStyles as styles } from '../../styles';
import { COLORS } from '../../../../constants/theme';

/**
 * Komponen yang ditampilkan ketika tidak ada notifikasi
 */
const EmptyNotification: React.FC = () => {
  return (
    <Animated.View 
      entering={FadeInDown.duration(600).springify()}
      style={styles.emptyContainer}
    >
      <Ionicons 
        name="notifications-off-outline" 
        size={80} 
        color={COLORS.neutral[400]} 
        style={{ marginBottom: 20 }}
      />
      <Text style={styles.emptyTitle}>Tidak Ada Notifikasi</Text>
      <Text style={styles.emptyText}>
        Anda belum memiliki notifikasi saat ini. Notifikasi akan muncul di sini ketika ada aktivitas penting pada akun Anda.
      </Text>
    </Animated.View>
  );
};

export default EmptyNotification; 