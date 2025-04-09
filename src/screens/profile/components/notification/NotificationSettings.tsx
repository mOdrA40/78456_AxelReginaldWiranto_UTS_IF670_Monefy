import React, { useState, useEffect } from 'react';
import { View, Text, Switch, TouchableOpacity, Alert, Platform, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';

// Style
import { notificationsStyles as styles } from '../../styles';
import { COLORS } from '../../../../constants/theme';

// Helpers
import { 
  getNotificationSettings, 
  saveNotificationSettings, 
  registerForPushNotificationsAsync 
} from '../../../../utils/notificationHelper';

interface NotificationSettingsProps {
  onRefresh: () => void;
}

/**
 * Komponen untuk menampilkan dan mengubah pengaturan notifikasi
 */
const NotificationSettings: React.FC<NotificationSettingsProps> = ({ onRefresh }) => {
  const [settings, setSettings] = useState({
    transactionNotifications: true,
    budgetNotifications: true,
    goalNotifications: true,
    systemNotifications: true,
    masterEnabled: false,
  });
  
  const [permissionStatus, setPermissionStatus] = useState<Notifications.PermissionStatus>();

  // Load Settings
  useEffect(() => {
    const loadSettings = async () => {
      // Cek status perizinan notifikasi
      const { status } = await Notifications.getPermissionsAsync();
      setPermissionStatus(status);
      
      // Load pengaturan dari storage
      const savedSettings = await getNotificationSettings();
      if (savedSettings) {
        setSettings(prev => ({
          ...prev,
          ...savedSettings,
          masterEnabled: status === 'granted'
        }));
      } else {
        setSettings(prev => ({
          ...prev,
          masterEnabled: status === 'granted'
        }));
      }
    };
    
    loadSettings();
  }, []);

  // Toggle individual setting
  const toggleSetting = async (key: string) => {
    const newSettings = {
      ...settings,
      [key]: !settings[key as keyof typeof settings]
    };
    
    setSettings(newSettings);
    await saveNotificationSettings(newSettings);
    onRefresh();
  };

  // Request permission untuk notifikasi
  const requestPermission = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      
      if (status === 'granted') {
        // Register for push notifications if permission granted
        await registerForPushNotificationsAsync();
        setPermissionStatus(status);
        setSettings(prev => ({ ...prev, masterEnabled: true }));
        onRefresh();
      } else {
        setPermissionStatus(status);
        setSettings(prev => ({ ...prev, masterEnabled: false }));
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
      Alert.alert('Gagal', 'Terjadi kesalahan saat meminta izin notifikasi.');
    }
  };

  // Buka pengaturan aplikasi untuk notifikasi
  const openNotificationSettings = async () => {
    if (Platform.OS === 'ios') {
      await Linking.openSettings();
    } else {
      await Linking.openSettings();
    }
  };

  return (
    <View style={styles.settingContainer}>
      <Text style={styles.settingTitle}>Pengaturan Notifikasi</Text>

      {/* Master toggle */}
      <View style={styles.settingRow}>
        <Ionicons 
          name="notifications" 
          size={20} 
          color={settings.masterEnabled ? COLORS.primary.main : COLORS.neutral[400]} 
          style={{ marginRight: 10 }}
        />
        <Text style={styles.settingLabel}>Aktifkan Notifikasi</Text>
        
        {permissionStatus === 'granted' ? (
          <View style={{ opacity: settings.masterEnabled ? 1 : 0.5 }}>
            <Text style={styles.notificationTime}>Diizinkan</Text>
          </View>
        ) : (
          <TouchableOpacity 
            style={styles.permissionButton} 
            onPress={requestPermission}
          >
            <Text style={styles.permissionButtonText}>Izinkan</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Individual notification settings */}
      {permissionStatus === 'granted' && (
        <>
          <View style={styles.settingRow}>
            <Ionicons 
              name="wallet-outline" 
              size={20} 
              color={settings.transactionNotifications ? COLORS.success[600] : COLORS.neutral[400]}
              style={{ marginRight: 10 }}
            />
            <Text style={styles.settingLabel}>Transaksi</Text>
            <Switch
              value={settings.transactionNotifications}
              onValueChange={() => toggleSetting('transactionNotifications')}
              trackColor={{ false: COLORS.neutral[300], true: COLORS.primary.light }}
              thumbColor={settings.transactionNotifications ? COLORS.primary.main : COLORS.neutral[100]}
            />
          </View>

          <View style={styles.settingRow}>
            <Ionicons 
              name="pie-chart-outline" 
              size={20} 
              color={settings.budgetNotifications ? COLORS.warning[500] : COLORS.neutral[400]}
              style={{ marginRight: 10 }}
            />
            <Text style={styles.settingLabel}>Anggaran</Text>
            <Switch
              value={settings.budgetNotifications}
              onValueChange={() => toggleSetting('budgetNotifications')}
              trackColor={{ false: COLORS.neutral[300], true: COLORS.primary.light }}
              thumbColor={settings.budgetNotifications ? COLORS.primary.main : COLORS.neutral[100]}
            />
          </View>

          <View style={styles.settingRow}>
            <Ionicons 
              name="flag-outline" 
              size={20} 
              color={settings.goalNotifications ? COLORS.info[500] : COLORS.neutral[400]}
              style={{ marginRight: 10 }}
            />
            <Text style={styles.settingLabel}>Tujuan Keuangan</Text>
            <Switch
              value={settings.goalNotifications}
              onValueChange={() => toggleSetting('goalNotifications')}
              trackColor={{ false: COLORS.neutral[300], true: COLORS.primary.light }}
              thumbColor={settings.goalNotifications ? COLORS.primary.main : COLORS.neutral[100]}
            />
          </View>

          <View style={styles.settingRow}>
            <Ionicons 
              name="information-circle-outline" 
              size={20} 
              color={settings.systemNotifications ? COLORS.primary.main : COLORS.neutral[400]}
              style={{ marginRight: 10 }}
            />
            <Text style={styles.settingLabel}>Sistem & Aplikasi</Text>
            <Switch
              value={settings.systemNotifications}
              onValueChange={() => toggleSetting('systemNotifications')}
              trackColor={{ false: COLORS.neutral[300], true: COLORS.primary.light }}
              thumbColor={settings.systemNotifications ? COLORS.primary.main : COLORS.neutral[100]}
            />
          </View>
        </>
      )}

      {/* Link to system settings */}
      {permissionStatus !== 'granted' && (
        <TouchableOpacity 
          onPress={openNotificationSettings}
          style={{ marginTop: 10 }}
        >
          <Text style={{ color: COLORS.primary.main, textAlign: 'center' }}>
            Buka pengaturan aplikasi
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default NotificationSettings; 