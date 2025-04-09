import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY, SPACING } from '../../constants/theme';

interface LogoProps {
  size?: number;
  showText?: boolean;
  showTagline?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 80, 
  showText = true,
  showTagline = true
}) => {
  const iconSize = size * 0.8;
  
  return (
    <View style={styles.container}>
      <View style={[styles.logoCircle, { width: size, height: size }]}>
        <Ionicons name="wallet-outline" size={iconSize} color={COLORS.white} />
      </View>
      
      {showText && (
        <Text style={styles.appName}>Monefiy</Text>
      )}
      
      {showTagline && (
        <Text style={styles.tagline}>Kelola Keuangan Anda Dengan Bijak</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logoCircle: {
    backgroundColor: COLORS.primary.main,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  appName: {
    ...TYPOGRAPHY.h1,
    color: COLORS.primary.main,
    marginBottom: SPACING.xs / 2,
  },
  tagline: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textSecondary,
  },
});

export default Logo; 