import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  BackHandler,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';


import { PinDisplay, PinKeypad, EmergencyButton } from './components';


import { AppLockScreenProps } from './AppLockScreen.types';


import { styles } from './AppLockScreen.styles';


import {
  authenticateWithPIN,
  authenticateWithBiometric,
  loadSecuritySettings,
  updateLastActiveTime,
  resetAllSecuritySettings,
} from '../../../utils/securityUtils';
import {
  triggerErrorHaptic,
  triggerSuccessHaptic
} from './AppLockScreen.utils';
import { COLORS } from '../../../constants/theme';


import { useSecurity } from '../../../contexts/SecurityContext';


const AppLockScreen: React.FC<AppLockScreenProps> = ({ onUnlock }) => {
  const { forceUnlock } = useSecurity();
  const [pin, setPin] = useState('');
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showEmergencyButton, setShowEmergencyButton] = useState(false);
  const [emergencyPressCount, setEmergencyPressCount] = useState(0);

  const MAX_PIN_LENGTH = 6;

 
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await loadSecuritySettings();
        setBiometricEnabled(settings.biometricEnabled);
        setErrorMessage('');
      } catch (error) {
        console.error('Error loading security settings:', error);
      }
    };

    loadSettings();

  
    const timer = setTimeout(() => {
      setShowEmergencyButton(true);
    }, 30000); 

    return () => clearTimeout(timer);
  }, []);

  const handleBiometricAuth = async () => {
    try {
      setIsAuthenticating(true);
      const success = await authenticateWithBiometric();

      if (success) {
        triggerSuccessHaptic();
        await updateLastActiveTime();
        onUnlock();
      } else {
        triggerErrorHaptic();
        setErrorMessage('Autentikasi biometrik gagal. Silakan coba lagi atau gunakan PIN.');
      }
    } catch (error) {
      console.error('Error during biometric authentication:', error);
      setErrorMessage('Terjadi kesalahan saat autentikasi biometrik.');
      triggerErrorHaptic();
    } finally {
      setIsAuthenticating(false);
    }
  };

  useEffect(() => {
    if (biometricEnabled) {
      const timer = setTimeout(() => {
        handleBiometricAuth();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [biometricEnabled]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return true; 
    });

    return () => backHandler.remove();
  }, []);

  const handleKeyPress = useCallback((key: string) => {
    if (pin.length < MAX_PIN_LENGTH) {
      const newPin = pin + key;
      setPin(newPin);

      if (newPin.length === MAX_PIN_LENGTH) {
        verifyPin(newPin);
      }
    }
  }, [pin]);

  const handleDelete = useCallback(() => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
      setErrorMessage('');
    }
  }, [pin]);

  const verifyPin = async (pinToVerify: string) => {
    try {
      setIsAuthenticating(true);
      const success = await authenticateWithPIN(pinToVerify);

      if (success) {
        triggerSuccessHaptic();
        await updateLastActiveTime();
        onUnlock();
      } else {
        triggerErrorHaptic();
        setPin('');
        setErrorMessage('PIN salah. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error verifying PIN:', error);
      setPin('');
      setErrorMessage('Terjadi kesalahan saat verifikasi PIN.');
      triggerErrorHaptic();
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleEmergencyPress = useCallback(() => {
    const newCount = emergencyPressCount + 1;
    setEmergencyPressCount(newCount);

    if (newCount === 3) {
      Alert.alert(
        'Reset PIN',
        'Apakah Anda yakin ingin mereset PIN? Anda akan diminta untuk membuat PIN baru.',
        [
          {
            text: 'Batal',
            style: 'cancel',
            onPress: () => setEmergencyPressCount(0),
          },
          {
            text: 'Reset',
            style: 'destructive',
            onPress: async () => {
              try {
                await resetAllSecuritySettings();
                forceUnlock();
              } catch (error) {
                console.error('Error resetting PIN:', error);
                setErrorMessage('Gagal mereset PIN. Silakan coba lagi nanti.');
                setEmergencyPressCount(0);
              }
            },
          },
        ]
      );
    }
  }, [emergencyPressCount, forceUnlock]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary.dark} />

      <LinearGradient
        colors={[COLORS.primary.dark, COLORS.primary.main]}
        style={styles.gradient}
      >
        <Animated.View
          style={styles.header}
          entering={FadeInDown.duration(800)}
        >
          <View style={styles.appIcon}>
            <Ionicons name="wallet-outline" size={40} color={COLORS.primary.main} />
          </View>

          <Text style={styles.title}>Monefiy</Text>
          <Text style={styles.subtitle}>Masukkan PIN untuk membuka aplikasi</Text>
        </Animated.View>

        <View style={styles.pinContainer}>
          <PinDisplay pinLength={pin.length} maxLength={MAX_PIN_LENGTH} />

          {errorMessage ? (
            <Animated.Text
              style={styles.errorMessage}
              entering={FadeIn.duration(300)}
            >
              {errorMessage}
            </Animated.Text>
          ) : null}

          <PinKeypad
            onKeyPress={handleKeyPress}
            onDelete={handleDelete}
            onBiometricPress={handleBiometricAuth}
            showBiometric={biometricEnabled}
            isAuthenticating={isAuthenticating}
          />

          <EmergencyButton
            visible={showEmergencyButton}
            onPress={handleEmergencyPress}
            pressCount={emergencyPressCount}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default AppLockScreen;
