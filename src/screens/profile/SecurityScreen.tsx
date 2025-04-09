import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import Animated, { FadeInDown } from 'react-native-reanimated';

// Types
import { SecurityScreenNavigationProp } from './types/index';

// Styles
import { securityStyles as styles } from './styles';

// Components
import {
  SecurityInfoCard,
  SecuritySettingItem,
  PinModal,
  AutoLockModal
} from './components';

// Hooks & Utils
import { useSecurity } from '../../contexts/SecurityContext';
import { checkBiometricSupport, loadSecuritySettings, resetAllSecuritySettings } from '../../utils/securityUtils';
import { getAutoLockTimeLabel } from './utils/SecurityUtils';
import { AUTO_LOCK_OPTIONS } from './constants';
import { COLORS } from '../../constants/theme';

const SecurityScreen = () => {
  const navigation = useNavigation<SecurityScreenNavigationProp>();
  const { securitySettings, updateSecuritySettings, loadSecuritySettings } = useSecurity();

  // State untuk modal dan input PIN
  const [pinModalVisible, setPinModalVisible] = useState(false);
  const [pinConfirmModalVisible, setPinConfirmModalVisible] = useState(false);
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinStep, setPinStep] = useState<'create' | 'confirm'>('create');
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [autoLockModalVisible, setAutoLockModalVisible] = useState(false);

  // Effect untuk memeriksa ketersediaan biometrik
  useEffect(() => {
    (async () => {
      const isAvailable = await checkBiometricSupport();
      setBiometricAvailable(isAvailable);
    })();
  }, []);

  // Toggle PIN protection
  const togglePinProtection = () => {
    if (securitySettings.pinEnabled) {
      // Menonaktifkan PIN
      setPinModalVisible(true);
    } else {
      // Mengaktifkan PIN
      setNewPin('');
      setConfirmPin('');
      setPinStep('create');
      setPinConfirmModalVisible(true);
    }
  };

  // Toggle biometric authentication
  const toggleBiometricAuthentication = async () => {
    if (!biometricAvailable) {
      Alert.alert(
        'Biometrik Tidak Tersedia',
        'Perangkat Anda tidak mendukung atau belum mengatur autentikasi biometrik.',
        [{ text: 'OK' }]
      );
      return;
    }

    // Jika mengaktifkan biometrik, pastikan PIN sudah diaktifkan
    if (!securitySettings.biometricEnabled && !securitySettings.pinEnabled) {
      Alert.alert(
        'Aktifkan PIN Terlebih Dahulu',
        'Anda harus mengaktifkan PIN sebelum dapat menggunakan biometrik.',
        [{ text: 'OK' }]
      );
      return;
    }

    // Verifikasi dengan biometrik saat ini jika sedang diaktifkan
    if (securitySettings.biometricEnabled) {
      try {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Verifikasi untuk menonaktifkan biometrik',
          cancelLabel: 'Batal',
          disableDeviceFallback: false,
        });

        if (result.success) {
          await updateSecuritySettings({
            ...securitySettings,
            biometricEnabled: !securitySettings.biometricEnabled,
          });
        }
      } catch (error) {
        console.error('Error during biometric authentication:', error);
        Alert.alert(
          'Gagal Memverifikasi',
          'Terjadi kesalahan saat mencoba memverifikasi biometrik Anda.'
        );
      }
    } else {
      try {
        await updateSecuritySettings({
          ...securitySettings,
          biometricEnabled: !securitySettings.biometricEnabled,
        });
      } catch (error) {
        console.error('Error updating biometric settings:', error);
        Alert.alert(
          'Gagal Memperbarui Pengaturan',
          'Terjadi kesalahan saat mencoba memperbarui pengaturan biometrik.'
        );
      }
    }
  };

  // Toggle auto lock
  const toggleAutoLock = () => {
    updateSecuritySettings({
      ...securitySettings,
      autoLockEnabled: !securitySettings.autoLockEnabled,
    });
  };

  // Set auto lock time
  const setAutoLockTime = (time: number) => {
    updateSecuritySettings({
      ...securitySettings,
      autoLockTime: time,
    });
    setAutoLockModalVisible(false);
  };

  // Toggle remember logged in
  const toggleRememberLoggedIn = () => {
    updateSecuritySettings({
      ...securitySettings,
      rememberLoggedIn: !securitySettings.rememberLoggedIn,
    });
  };

  // Menangani submit PIN baru
  const handlePinSubmit = () => {
    if (pinStep === 'create') {
      // Memvalidasi format PIN (harus 6 digit numerik)
      if (newPin.length !== 6 || !/^\d{6}$/.test(newPin)) {
        Alert.alert('PIN Tidak Valid', 'PIN harus terdiri dari 6 digit numerik.');
        return;
      }

      // Lanjut ke langkah konfirmasi
      setPinStep('confirm');
    } else {
      // Memastikan konfirmasi PIN sama dengan PIN baru
      if (newPin === confirmPin) {
        // Log untuk debugging
        console.log('=== SETTING NEW PIN ===');
        console.log('New PIN:', newPin);
        console.log('Current security settings:', securitySettings);

        // Simpan PIN dengan menggunakan async/await dalam IIFE
        (async () => {
          try {
            // Perbarui pengaturan keamanan dengan PIN baru
            const newSettings = {
              ...securitySettings,
              pinEnabled: true,
              pin: newPin,
            };

            console.log('New security settings to save:', newSettings);
            await updateSecuritySettings(newSettings);

            // Verifikasi PIN tersimpan dengan benar
            const savedSettings = await loadSecuritySettings();
            console.log('Saved settings after update:', savedSettings);
            console.log('Saved PIN:', savedSettings.pin);
            console.log('PIN enabled:', savedSettings.pinEnabled);

            // Tutup modal dan reset state
            setPinConfirmModalVisible(false);
            setNewPin('');
            setConfirmPin('');
            setPinStep('create');

            // Konfirmasi ke pengguna
            Alert.alert('PIN Berhasil Diatur', 'PIN keamanan Anda berhasil diperbarui.');
            console.log('=== PIN SETUP COMPLETED ===');
          } catch (error) {
            console.error('Error saving PIN:', error);
            Alert.alert('Gagal Menyimpan PIN', 'Terjadi kesalahan saat menyimpan PIN. Silakan coba lagi.');
          }
        })();
      } else {
        Alert.alert('PIN Tidak Cocok', 'PIN dan konfirmasi PIN tidak cocok. Silakan coba lagi.');
        setConfirmPin('');
      }
    }
  };

  // Verifikasi PIN saat ini
  const verifyCurrentPin = () => {
    console.log('=== VERIFYING CURRENT PIN ===');
    console.log('Input PIN:', currentPin);
    console.log('Stored PIN:', securitySettings.pin);

    // Memeriksa apakah PIN saat ini cocok
    if (currentPin === securitySettings.pin) {
      console.log('PIN verification successful');

      // Perbarui pengaturan keamanan dalam IIFE
      (async () => {
        try {
          // Menonaktifkan PIN dan biometrik
          const newSettings = {
            ...securitySettings,
            pinEnabled: false,
            biometricEnabled: false,
          };

          console.log('New security settings after PIN disabled:', newSettings);
          await updateSecuritySettings(newSettings);

          // Verifikasi pengaturan diperbarui
          const savedSettings = await loadSecuritySettings();
          console.log('Saved settings after PIN disabled:', savedSettings);

          // Tutup modal dan reset state
          setPinModalVisible(false);
          setCurrentPin('');

          // Konfirmasi ke pengguna
          Alert.alert('PIN Dinonaktifkan', 'Pengaturan keamanan PIN telah dinonaktifkan.');
          console.log('=== PIN VERIFICATION COMPLETED ===');
        } catch (error) {
          console.error('Error disabling PIN:', error);
          Alert.alert('Gagal Menonaktifkan PIN', 'Terjadi kesalahan saat menonaktifkan PIN. Silakan coba lagi.');
        }
      })();
    } else {
      console.log('PIN verification failed');
      Alert.alert('PIN Salah', 'PIN yang Anda masukkan salah. Silakan coba lagi.');
      setCurrentPin('');
    }
  };

  // Ubah PIN
  const changePin = () => {
    setNewPin('');
    setConfirmPin('');
    setPinStep('create');
    setPinConfirmModalVisible(true);
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.surface}
        barStyle="dark-content"
      />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Keamanan</Text>
      </View>

      <ScrollView style={styles.content}>
        <SecurityInfoCard />

        <View style={styles.sectionContainer}>
          <Animated.View
            entering={FadeInDown.delay(300).springify()}
          >
            <Text style={styles.sectionTitle}>Kunci Aplikasi</Text>

            <SecuritySettingItem
              icon="keypad"
              title="PIN Keamanan"
              description="Gunakan PIN 6 digit untuk mengakses aplikasi"
              value={securitySettings.pinEnabled}
              onValueChange={togglePinProtection}
            />

            {securitySettings.pinEnabled && (
              <TouchableOpacity
                style={styles.settingActionButton}
                onPress={changePin}
              >
                <Text style={styles.settingActionText}>Ubah PIN</Text>
              </TouchableOpacity>
            )}

            <SecuritySettingItem
              icon="finger-print"
              title="Biometrik"
              description="Gunakan sidik jari atau Face ID untuk login"
              value={securitySettings.biometricEnabled}
              onValueChange={toggleBiometricAuthentication}
              disabled={!biometricAvailable || !securitySettings.pinEnabled}
              iconColor={biometricAvailable ? COLORS.primary.main : COLORS.neutral[400]}
            />

            <SecuritySettingItem
              icon="lock-closed"
              title="Kunci Otomatis"
              description="Kunci aplikasi setelah tidak aktif"
              value={securitySettings.autoLockEnabled}
              onValueChange={toggleAutoLock}
              disabled={!securitySettings.pinEnabled}
            />

            {securitySettings.autoLockEnabled && (
              <TouchableOpacity
                style={styles.settingValueButton}
                onPress={() => setAutoLockModalVisible(true)}
              >
                <Text style={styles.settingValueLabel}>Waktu kunci:</Text>
                <View style={styles.settingValue}>
                  <Text style={styles.settingValueText}>
                    {getAutoLockTimeLabel(securitySettings.autoLockTime)}
                  </Text>
                  <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
                </View>
              </TouchableOpacity>
            )}
          </Animated.View>
        </View>

        <View style={styles.sectionContainer}>
          <Animated.View
            entering={FadeInDown.delay(400).springify()}
          >
            <Text style={styles.sectionTitle}>Pengaturan Login</Text>

            <SecuritySettingItem
              icon="log-in"
              title="Ingat Status Login"
              description="Tetap login setelah aplikasi ditutup"
              value={securitySettings.rememberLoggedIn}
              onValueChange={toggleRememberLoggedIn}
            />

            <TouchableOpacity
              style={styles.settingActionButton}
              onPress={async () => {
                try {
                  // Konfirmasi reset
                  Alert.alert(
                    'Reset Pengaturan Keamanan',
                    'Apakah Anda yakin ingin mereset semua pengaturan keamanan?',
                    [
                      { text: 'Batal', style: 'cancel' },
                      {
                        text: 'Reset',
                        style: 'destructive',
                        onPress: async () => {
                          await resetAllSecuritySettings();
                          // Muat ulang pengaturan
                          const updatedSettings = await loadSecuritySettings();
                          // Update context
                          updateSecuritySettings(updatedSettings);
                          Alert.alert('Reset Berhasil', 'Semua pengaturan keamanan telah direset.');
                        },
                      },
                    ]
                  );
                } catch (error) {
                  console.error('Error resetting security settings:', error);
                  Alert.alert('Error', 'Gagal mereset pengaturan keamanan.');
                }
              }}
            >
              <Text style={styles.settingActionText}>Reset Semua Pengaturan</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Menambahkan padding bottom untuk jarak dengan bottom navbar */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Modal untuk verifikasi PIN */}
      <PinModal
        visible={pinModalVisible}
        title="Verifikasi PIN"
        description="Masukkan PIN keamanan Anda saat ini untuk melanjutkan."
        pin={currentPin}
        setPin={setCurrentPin}
        onCancel={() => {
          setPinModalVisible(false);
          setCurrentPin('');
        }}
        onSubmit={verifyCurrentPin}
        submitDisabled={currentPin.length !== 6}
        submitText="Verifikasi"
      />

      {/* Modal untuk membuat PIN baru */}
      <PinModal
        visible={pinConfirmModalVisible}
        title={pinStep === 'create' ? 'Buat PIN Baru' : 'Konfirmasi PIN'}
        description={pinStep === 'create'
          ? 'Buat PIN 6 digit untuk mengamankan aplikasi Anda.'
          : 'Masukkan PIN yang sama sekali lagi untuk konfirmasi.'}
        pin={pinStep === 'create' ? newPin : confirmPin}
        setPin={pinStep === 'create' ? setNewPin : setConfirmPin}
        onCancel={() => {
          setPinConfirmModalVisible(false);
          setNewPin('');
          setConfirmPin('');
          setPinStep('create');
        }}
        onSubmit={handlePinSubmit}
        submitDisabled={
          (pinStep === 'create' && newPin.length !== 6) ||
          (pinStep === 'confirm' && confirmPin.length !== 6)
        }
        submitText={pinStep === 'create' ? 'Lanjutkan' : 'Simpan'}
        showPinDots={true}
      />

      {/* Modal untuk waktu auto lock */}
      <AutoLockModal
        visible={autoLockModalVisible}
        options={AUTO_LOCK_OPTIONS}
        currentValue={securitySettings.autoLockTime}
        onSelect={setAutoLockTime}
        onCancel={() => setAutoLockModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default SecurityScreen;