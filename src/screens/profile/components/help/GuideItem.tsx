import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { GuideItem as GuideItemType } from '../../types/help.types';
import { helpStyles as styles } from '../../styles';
import { COLORS } from '../../../../constants/theme';

interface GuideItemProps {
  item: GuideItemType;
  index: number;
}

/**
 * Komponen untuk menampilkan item panduan
 */
const GuideItem: React.FC<GuideItemProps> = ({ item, index }) => {
  return (
    <Animated.View
      key={item.id}
      entering={FadeInDown.delay(100 + index * 50).springify()}
    >
      <View style={styles.guideItem}>
        <View style={styles.guideHeader}>
          <View style={styles.guideIconContainer}>
            <Ionicons
              name={item.icon as any}
              size={22}
              color={COLORS.primary.main}
            />
          </View>
          <Text style={styles.guideTitle}>{item.title}</Text>
        </View>
        <View style={styles.guideContent}>
          {item.content.map((step: string, i: number) => (
            <Text key={i} style={styles.guideStep}>{step}</Text>
          ))}
        </View>
      </View>
    </Animated.View>
  );
};

export default GuideItem;
