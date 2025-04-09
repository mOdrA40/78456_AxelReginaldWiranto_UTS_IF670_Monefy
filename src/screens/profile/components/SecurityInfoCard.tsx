import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

import { COLORS } from '../../../constants/theme';
import { securityStyles as styles } from '../styles';

/**
 * Komponen untuk menampilkan kartu informasi keamanan
 */
const SecurityInfoCard: React.FC = () => {
  return (
    <Animated.View
      entering={FadeInDown.delay(200).springify()}
      style={styles.infoCard}
    >
      <LinearGradient
        colors={[COLORS.primary.light, COLORS.primary.main, COLORS.primary.dark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.infoCardGradient}
      >
        <Ionicons name="shield-checkmark" size={32} color={COLORS.white} />
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoTitle}>Amankan Aplikasi Keuangan Anda</Text>
          <Text style={styles.infoDescription}>
            Lindungi data keuangan pribadi Anda dari akses yang tidak sah.
          </Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

export default SecurityInfoCard;
