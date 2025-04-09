import React, { useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import { COLORS } from '../../../constants/theme';
import { ProfileMenuItem as ProfileMenuItemType } from '../types';
import { profileStyles as styles } from '../styles';

interface ProfileMenuItemProps {
  item: ProfileMenuItemType;
  index: number;
}

/**
 * Komponen untuk menampilkan item menu profil dengan animasi yang dioptimalkan
 * untuk mencegah double render
 */
const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({ item, index }) => {
  // Gunakan useRef untuk mengingat apakah komponen sudah di-mount
  // sehingga animasi hanya dijalankan pada render pertama
  const isMounted = useRef(false);
  
  // Batasi delay animasi maksimum untuk mencegah efek kaskade yang terlalu panjang
  const delayFactor = Math.min(index, 5);
  const animationDelay = 100 + delayFactor * 40;
  
  return (
    <Animated.View
      key={`menu-item-${item.id}`}
      entering={isMounted.current ? undefined : FadeInDown.delay(animationDelay).springify()}
      onLayout={() => {
        // Setelah komponen di-render pertama kali, tandai sebagai mounted
        isMounted.current = true;
      }}
    >
      <TouchableOpacity
        style={styles.menuItem}
        onPress={item.onPress}
        activeOpacity={0.7}
      >
        <View style={styles.menuItemLeft}>
          <View
            style={[
              styles.menuItemIcon,
              item.danger && styles.dangerIcon,
            ]}
          >
            <Ionicons
              name={item.icon as any}
              size={20}
              color={item.danger ? COLORS.danger[600] : COLORS.primary.main}
            />
          </View>
          <View style={styles.menuItemTextContainer}>
            <Text
              style={[
                styles.menuItemTitle,
                item.danger && styles.dangerText,
              ]}
            >
              {item.title}
            </Text>
            {item.subtitle && (
              <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
            )}
          </View>
        </View>
        
        <View style={styles.menuItemRight}>
          {item.rightComponent ? (
            item.rightComponent
          ) : (
            !item.danger && (
              <Ionicons
                name="chevron-forward"
                size={20}
                color={COLORS.textSecondary}
              />
            )
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default React.memo(ProfileMenuItem);
