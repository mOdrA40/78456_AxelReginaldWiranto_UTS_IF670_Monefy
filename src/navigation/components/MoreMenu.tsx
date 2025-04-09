import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { COLORS } from '../../constants/theme';
import { MainTabParamList } from '../types';
import { styles } from '../styles/MainNavigator.styles';

type MoreMenuNavigationProp = StackNavigationProp<MainTabParamList>;

const MoreMenu: React.FC = () => {
  const navigation = useNavigation<MoreMenuNavigationProp>();

  const menuItems = [
    {
      id: 'goals',
      title: 'Tujuan Keuangan',
      icon: 'flag-outline',
      onPress: () => navigation.navigate('Goals')
    },
    {
      id: 'reports',
      title: 'Laporan',
      icon: 'bar-chart-outline',
      onPress: () => navigation.navigate('Reports')
    },
    {
      id: 'profile',
      title: 'Profil',
      icon: 'person-outline',
      onPress: () => navigation.navigate('Profile')
    },
  ];

  return (
    <View style={styles.moreMenuContainer}>
      <View style={styles.moreMenuHeader}>
        <Text style={styles.moreMenuTitle}>Menu Lainnya</Text>
      </View>
      <View style={styles.menuItemsContainer}>
        {menuItems.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <Ionicons name={item.icon as any} size={24} color={COLORS.primary.main} />
            <Text style={styles.menuItemText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};



export default memo(MoreMenu);
