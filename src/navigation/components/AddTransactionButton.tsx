import React, { memo } from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from '../styles/MainNavigator.styles';

const AddTransactionButton: React.FC = () => {
  return (
    <View style={styles.fabContainer}>
      <View style={styles.fab}>
        <Ionicons name="add" size={28} color="white" />
      </View>
    </View>
  );
};



export default memo(AddTransactionButton);
