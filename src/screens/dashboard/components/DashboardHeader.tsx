import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { DashboardHeaderProps } from '../types';
import { styles } from '../styles/DashboardHeader.styles';

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userName,
  onProfilePress
}) => {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>
          Halo, {userName}
        </Text>
        <Text style={styles.date}>
          {new Date().toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </Text>
      </View>
      <TouchableOpacity onPress={onProfilePress} activeOpacity={0.7}>
        <View style={styles.profileIcon}>
          <Text style={styles.profileInitial}>
            {userName?.[0]?.toUpperCase() || 'U'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};



export default DashboardHeader;
