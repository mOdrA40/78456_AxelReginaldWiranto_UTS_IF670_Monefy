import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import HelpScreen from '../HelpScreen';
import { COLORS } from '../../../constants/theme';

// Tipe untuk navigasi pusat bantuan
type HelpCenterStackParamList = {
  HelpMain: undefined;
  // Tambahkan layar bantuan lain nanti jika diperlukan
};

// Membuat navigator untuk pusat bantuan
const HelpCenterStack = createStackNavigator<HelpCenterStackParamList>();

/**
 * Komponen pusat bantuan yang mengatur navigasi
 * antar layar bantuan yang berbeda
 */
const HelpCenterScreen = () => {
  return (
    <View style={styles.container}>
      <HelpCenterStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <HelpCenterStack.Screen name="HelpMain" component={HelpScreen} />
        {/* Tambahkan layar bantuan lain di sini ketika diperlukan */}
      </HelpCenterStack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});

export default HelpCenterScreen; 