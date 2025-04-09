import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

import { DeveloperInfo } from '../../types/developer.types';
import { developerStyles as styles } from '../../styles';
import { COLORS } from '../../../../constants/theme';

interface DeveloperProfileProps {
  developerInfo: DeveloperInfo;
}

/**
 * Komponen untuk menampilkan profil pengembang
 */
const DeveloperProfile: React.FC<DeveloperProfileProps> = ({ developerInfo }) => {
  return (
    <Animated.View entering={FadeInDown.delay(200).springify()}>
      <LinearGradient
        colors={[COLORS.primary.dark, COLORS.primary.main]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.profileContainer}
      >
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImagePlaceholder}>
            <Text style={styles.profileInitials}>
              {developerInfo.name.split(' ').map((n: string) => n[0]).join('')}
            </Text>
          </View>
        </View>
        
        <Text style={styles.developerName}>
          Axel Reginald{'\n'}
          <Text style={styles.developerLastName}>Wiranto</Text>
        </Text>
        <Text style={styles.developerRole}>{developerInfo.role}</Text>
        
        <View style={styles.educationContainer}>
          <Ionicons name="school-outline" size={18} color="rgba(255,255,255,0.8)" />
          <Text style={styles.educationText}>
            {developerInfo.university} · {developerInfo.department} · {developerInfo.year}
          </Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

export default DeveloperProfile;
