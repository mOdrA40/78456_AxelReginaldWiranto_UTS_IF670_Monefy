import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { helpStyles as styles } from '../../styles';
import { COLORS } from '../../../../constants/theme';

interface TabSelectorProps {
  activeTab: 'faq' | 'guide';
  setActiveTab: (tab: 'faq' | 'guide') => void;
}

/**
 * Komponen untuk memilih tab FAQ atau Panduan
 */
const TabSelector: React.FC<TabSelectorProps> = ({ activeTab, setActiveTab }) => {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'faq' && styles.activeTab]}
        onPress={() => setActiveTab('faq')}
      >
        <Ionicons
          name="help-circle"
          size={20}
          color={activeTab === 'faq' ? COLORS.primary.main : COLORS.textSecondary}
        />
        <Text
          style={[styles.tabText, activeTab === 'faq' && styles.activeTabText]}
        >
          FAQ
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, activeTab === 'guide' && styles.activeTab]}
        onPress={() => setActiveTab('guide')}
      >
        <Ionicons
          name="book"
          size={20}
          color={activeTab === 'guide' ? COLORS.primary.main : COLORS.textSecondary}
        />
        <Text
          style={[styles.tabText, activeTab === 'guide' && styles.activeTabText]}
        >
          Panduan
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TabSelector;
