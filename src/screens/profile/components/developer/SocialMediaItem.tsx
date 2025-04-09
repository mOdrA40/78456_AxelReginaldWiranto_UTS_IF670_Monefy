import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { SocialMediaItem as SocialMediaItemType } from '../../types/developer.types';
import { developerStyles as styles } from '../../styles';
import { COLORS } from '../../../../constants/theme';

interface SocialMediaItemProps {
  item: SocialMediaItemType;
  index: number;
  onPress: (url: string) => void;
}

/**
 * Komponen untuk menampilkan item social media
 */
const SocialMediaItem: React.FC<SocialMediaItemProps> = ({ item, index, onPress }) => {
  return (
    <Animated.View
      key={item.platform}
      entering={FadeInDown.delay(800 + index * 100).springify()}
    >
      <TouchableOpacity
        style={styles.socialItem}
        onPress={() => onPress(item.url)}
      >
        <View style={styles.socialIconContainer}>
          <Ionicons name={item.icon as any} size={22} color={COLORS.white} />
        </View>
        <Text style={styles.socialText}>{item.platform}</Text>
        <Ionicons name="chevron-forward" size={16} color={COLORS.neutral[400]} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default SocialMediaItem;
