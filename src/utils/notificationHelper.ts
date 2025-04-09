import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

export type NotificationType = 'transaction' | 'budget' | 'goal' | 'system';
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  createdAt: Date;
  read: boolean;
  data?: {
    screen?: string;
    params?: any;
  };
}

const NOTIFICATION_STORAGE_KEY = '@monefiy_notifications';
const NOTIFICATION_SETTINGS_KEY = '@monefiy_notification_settings';
const SAMPLE_NOTIFICATIONS_ADDED_KEY = '@monefiy_sample_notifications_added';

/**
 * Menghasilkan ID unik untuk notifikasi
 *
 * @returns String ID unik berdasarkan timestamp dan angka acak
 */
const generateUniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const configureNotifications = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
};

/**
 * Mendaftarkan device untuk menerima push notification
 *
 * @returns Token push notification atau null jika gagal
 */
export const registerForPushNotificationsAsync = async (): Promise<string | null> => {
  if (!Device.isDevice) {
    console.log('Notifikasi push tidak berfungsi pada emulator/simulator');
    return null;
  }

  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('Izin notifikasi tidak diberikan');
      return null;
    }

    const tokenData = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig?.extra?.eas?.projectId,
    });

    console.log('Expo Push Token:', tokenData.data);

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#4F46E5',
      });
    }

    return tokenData.data;
  } catch (error) {
    console.error('Error getting push token:', error);
    return null;
  }
};

/**
 * Mengirim notifikasi lokal ke perangkat
 *
 * @param title - Judul notifikasi
 * @param body - Isi notifikasi
 * @param data - Data tambahan untuk notifikasi (opsional)
 * @returns ID notifikasi yang dijadwalkan
 */
export const sendLocalNotification = async (
  title: string,
  body: string,
  data: Record<string, any> = {}
): Promise<string> => {
  return await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
    },
    trigger: null,
  });
};

/**
 * Menambahkan notifikasi baru ke penyimpanan dan menampilkannya
 *
 * @param title - Judul notifikasi
 * @param message - Pesan notifikasi
 * @param type - Tipe notifikasi (transaction, budget, goal, system)
 * @param data - Data tambahan untuk notifikasi (opsional)
 * @returns Objek notifikasi yang baru dibuat
 */
export const addNotification = async (
  title: string,
  message: string,
  type: NotificationType,
  data: Record<string, any> = {}
): Promise<Notification> => {
  try {
    const newNotification: Notification = {
      id: generateUniqueId(),
      title,
      message,
      type,
      createdAt: new Date(),
      read: false,
      data,
    };

    const storedNotificationsJSON = await AsyncStorage.getItem(NOTIFICATION_STORAGE_KEY);
    const notifications: Notification[] = storedNotificationsJSON
      ? JSON.parse(storedNotificationsJSON)
      : [];

    const updatedNotifications = [newNotification, ...notifications];

    await AsyncStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(updatedNotifications));

    await sendLocalNotification(title, message, data);

    return newNotification;
  } catch (error) {
    console.error('Error adding notification:', error);
    throw error;
  }
};

/**
 * Mendapatkan semua notifikasi dari penyimpanan
 *
 * @returns Array notifikasi yang tersimpan
 */
export const getNotifications = async (): Promise<Notification[]> => {
  try {
    const storedNotificationsJSON = await AsyncStorage.getItem(NOTIFICATION_STORAGE_KEY);
    if (!storedNotificationsJSON) return [];

    const notifications: Notification[] = JSON.parse(storedNotificationsJSON);
    return notifications.map(note => ({
      ...note,
      createdAt: new Date(note.createdAt),
    }));
  } catch (error) {
    console.error('Error getting notifications:', error);
    return [];
  }
};

/**
 * Menandai notifikasi sebagai telah dibaca
 *
 * @param id - ID notifikasi yang akan ditandai
 * @returns Boolean yang menunjukkan keberhasilan operasi
 */
export const markAsRead = async (id: string): Promise<boolean> => {
  try {
    const notifications = await getNotifications();
    const updatedNotifications = notifications.map(note =>
      note.id === id ? { ...note, read: true } : note
    );

    await AsyncStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(updatedNotifications));
    return true;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return false;
  }
};

/**
 * Menghapus notifikasi berdasarkan ID
 *
 * @param id - ID notifikasi yang akan dihapus
 * @returns Boolean yang menunjukkan keberhasilan operasi
 */
export const deleteNotification = async (id: string): Promise<boolean> => {
  try {
    const notifications = await getNotifications();
    const updatedNotifications = notifications.filter(note => note.id !== id);

    await AsyncStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(updatedNotifications));
    return true;
  } catch (error) {
    console.error('Error deleting notification:', error);
    return false;
  }
};

/**
 * Menghapus semua notifikasi
 *
 * @returns Boolean yang menunjukkan keberhasilan operasi
 */
export const clearAllNotifications = async (): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify([]));
    return true;
  } catch (error) {
    console.error('Error clearing notifications:', error);
    return false;
  }
};

/**
 * Mengambil pengaturan notifikasi dari penyimpanan
 *
 * @returns Objek pengaturan notifikasi atau null jika tidak ada
 */
export const getNotificationSettings = async (): Promise<Record<string, boolean> | null> => {
  try {
    const settingsJSON = await AsyncStorage.getItem(NOTIFICATION_SETTINGS_KEY);
    if (!settingsJSON) return null;

    return JSON.parse(settingsJSON);
  } catch (error) {
    console.error('Error getting notification settings:', error);
    return null;
  }
};

/**
 * Menyimpan pengaturan notifikasi ke penyimpanan
 *
 * @param settings - Objek pengaturan notifikasi yang akan disimpan
 * @returns Boolean yang menunjukkan keberhasilan operasi
 */
export const saveNotificationSettings = async (settings: Record<string, boolean>): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(NOTIFICATION_SETTINGS_KEY, JSON.stringify(settings));
    return true;
  } catch (error) {
    console.error('Error saving notification settings:', error);
    return false;
  }
};

export const addSampleNotifications = async (): Promise<void> => {
  const hasAddedSamples = await AsyncStorage.getItem(SAMPLE_NOTIFICATIONS_ADDED_KEY);
  if (hasAddedSamples === 'true') {
    return;
  }

  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const twoDaysAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const sampleNotifications: Notification[] = [
    {
      id: generateUniqueId(),
      title: 'Selamat Datang di Monefiy!',
      message: 'Terima kasih telah mengunduh aplikasi keuangan pribadi terbaik. Mulai lacak pengeluaran dan penghasilan Anda sekarang.',
      type: 'system',
      read: false,
      createdAt: now,
    },
    {
      id: generateUniqueId(),
      title: 'Pengingat Tagihan',
      message: 'Tagihan listrik akan jatuh tempo dalam 3 hari. Pastikan untuk melakukan pembayaran tepat waktu.',
      type: 'budget',
      read: false,
      createdAt: oneHourAgo,
    },
    {
      id: generateUniqueId(),
      title: 'Transaksi Terdeteksi',
      message: 'Transaksi pembelian baru sebesar Rp 150.000 terdeteksi pada kategori Makanan.',
      type: 'transaction',
      read: true,
      createdAt: oneDayAgo,
    },
    {
      id: generateUniqueId(),
      title: 'Anggaran Makan Hampir Melebihi Batas',
      message: 'Anda telah menggunakan 85% dari anggaran Makanan bulan ini. Berhati-hatilah dengan pengeluaran selanjutnya.',
      type: 'budget',
      read: false,
      createdAt: twoDaysAgo,
    },
    {
      id: generateUniqueId(),
      title: 'Tujuan Tabungan',
      message: 'Selamat! Anda telah mencapai 50% dari target tabungan "Liburan Akhir Tahun" Anda.',
      type: 'goal',
      read: true,
      createdAt: oneWeekAgo,
    },
  ];

  let storedNotifications = await getNotifications();
  storedNotifications = [...sampleNotifications, ...storedNotifications];
  await AsyncStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(storedNotifications));

  await AsyncStorage.setItem(SAMPLE_NOTIFICATIONS_ADDED_KEY, 'true');
};

const scheduleLocalNotification = async (
  title: string,
  body: string,
  data?: any
): Promise<void> => {
  try {
    const settings = await getNotificationSettings();
    if (!settings || !settings.masterEnabled) {
      return;
    }
    
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
        sound: true,
      },
      trigger: null,
    });
  } catch (error) {
    console.error('Error scheduling notification:', error);
  }
};

export const getUnreadCount = async (): Promise<number> => {
  try {
    const notifications = await getNotifications();
    return notifications.filter(notification => !notification.read).length;
  } catch (error) {
    console.error('Error getting unread count:', error);
    return 0;
  }
};