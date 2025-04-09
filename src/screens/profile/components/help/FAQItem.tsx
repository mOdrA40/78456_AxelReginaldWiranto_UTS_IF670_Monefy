import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { FAQItem as FAQItemType } from '../../types/help.types';
import { helpStyles as styles } from '../../styles';
import { COLORS } from '../../../../constants/theme';

interface FAQItemProps {
  item: FAQItemType;
  index: number;
  expandedFAQ: string | null;
  toggleFAQ: (id: string) => void;
}

/**
 * Komponen untuk menampilkan item FAQ
 */
const FAQItem: React.FC<FAQItemProps> = ({ item, index, expandedFAQ, toggleFAQ }) => {
  return (
    <Animated.View
      key={item.id}
      entering={FadeInDown.delay(100 + index * 50).springify()}
    >
      <TouchableOpacity
        style={styles.faqItem}
        onPress={() => toggleFAQ(item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.faqHeader}>
          <Text style={styles.faqQuestion}>{item.question}</Text>
          <Ionicons
            name={expandedFAQ === item.id ? "chevron-up" : "chevron-down"}
            size={20}
            color={COLORS.textSecondary}
          />
        </View>
        {expandedFAQ === item.id && (
          <Text style={styles.faqAnswer}>{item.answer}</Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default FAQItem;
