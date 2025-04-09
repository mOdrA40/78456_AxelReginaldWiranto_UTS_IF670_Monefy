import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withDelay,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { COLORS, TYPOGRAPHY, SPACING } from '../constants/theme';

const { width, height } = Dimensions.get('window');
const isTablet = width >= 768;

const SplashScreen: React.FC = () => {
  const logoScale = useSharedValue(0.3);
  const logoOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  
  useEffect(() => {
   
    logoOpacity.value = withTiming(1, { duration: 800 });
    logoScale.value = withSequence(
      withTiming(1.2, { 
        duration: 800,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1), 
      }),
      withTiming(1, { 
        duration: 400,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1), 
      })
    );
    
    textOpacity.value = withDelay(
      600,
      withTiming(1, { duration: 800 })
    );
  }, []);
  
  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: logoOpacity.value,
      transform: [{ scale: logoScale.value }],
    };
  });
  
  const textStyle = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, logoStyle]}>
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoText}>M</Text>
        </View>
      </Animated.View>
      
      <Animated.Text style={[styles.appName, textStyle]}>
        Monefiy
      </Animated.Text>
      
      <Animated.Text style={[styles.tagline, textStyle]}>
        Kelola keuangan dengan cerdas
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary.main,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: isTablet ? 36 : 24,
  },
  logoPlaceholder: {
    width: isTablet ? 150 : 100,
    height: isTablet ? 150 : 100,
    borderRadius: isTablet ? 75 : 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: isTablet ? 90 : 60,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.primary.main,
  },
  appName: {
    fontSize: isTablet ? 48 : TYPOGRAPHY.fontSize.display,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: 'white',
    marginVertical: isTablet ? 12 : 8,
  },
  tagline: {
    fontSize: isTablet ? TYPOGRAPHY.fontSize.xl : TYPOGRAPHY.fontSize.lg,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    color: 'rgba(255, 255, 255, 0.8)',
  },
});

export default SplashScreen; 