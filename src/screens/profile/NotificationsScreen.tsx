import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  Alert,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

// Types
import { NotificationsScreenNavigationProp } from './types/index';

// Styles
import { notificationsStyles as styles } from './styles';

// Components
import { 
  NotificationItem, 
  EmptyNotification,
  NotificationSettings
} from './components';

// Helpers
import { 
  Notification,
  getNotifications, 
  markAsRead, 
  deleteNotification, 
  clearAllNotifications,
  configureNotifications,
  addNotification
} from '../../utils/notificationHelper';

// Constants
import { COLORS } from '../../constants/theme';

/**
 * Screen untuk menampilkan dan mengelola notifikasi
 */
const NotificationsScreen: React.FC = () => {
  const navigation = useNavigation<NotificationsScreenNavigationProp>();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'notifications' | 'settings'>('notifications');
  
  // Konfigurasi notifikasi
  useEffect(() => {
    configureNotifications();
  }, []);

  // Fetch notifikasi saat komponen dimount
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Fungsi untuk mengambil data notifikasi
  const fetchNotifications = useCallback(async () => {
    try {
      const notifs = await getNotifications();
      setNotifications(notifs);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Refresh data
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchNotifications();
  }, [fetchNotifications]);

  // Handler untuk navigasi kembali
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // Handler untuk menandai notifikasi sebagai telah dibaca
  const handleNotificationPress = useCallback(async (notification: Notification) => {
    if (!notification.read) {
      const success = await markAsRead(notification.id);
      if (success) {
        fetchNotifications();
      }
    }
    
    // Jika notifikasi memiliki data yang bisa digunakan untuk navigasi
    if (notification.data && notification.data.screen) {
      try {
        navigation.navigate(notification.data.screen as any, notification.data.params);
      } catch (error) {
        console.error('Navigation error:', error);
      }
    }
  }, [navigation, fetchNotifications]);

  // Handler untuk menghapus notifikasi
  const handleDeleteNotification = useCallback(async (id: string) => {
    Alert.alert(
      'Hapus Notifikasi',
      'Apakah Anda yakin ingin menghapus notifikasi ini?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            const success = await deleteNotification(id);
            if (success) {
              fetchNotifications();
            }
          },
        },
      ]
    );
  }, [fetchNotifications]);

  // Handler untuk menghapus semua notifikasi
  const handleClearAll = useCallback(() => {
    if (notifications.length === 0) return;
    
    Alert.alert(
      'Hapus Semua Notifikasi',
      'Apakah Anda yakin ingin menghapus semua notifikasi?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus Semua',
          style: 'destructive',
          onPress: async () => {
            const success = await clearAllNotifications();
            if (success) {
              fetchNotifications();
            }
          },
        },
      ]
    );
  }, [notifications.length, fetchNotifications]);

  // Render item untuk FlatList
  const renderNotificationItem = useCallback(({ item }: { item: Notification }) => {
    return (
      <NotificationItem
        notification={item}
        onPress={handleNotificationPress}
        onDelete={handleDeleteNotification}
      />
    );
  }, [handleNotificationPress, handleDeleteNotification]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifikasi</Text>
          
          <View style={styles.headerActions}>
            {activeTab === 'notifications' && notifications.length > 0 && (
              <TouchableOpacity 
                style={styles.headerActionButton}
                onPress={handleClearAll}
              >
                <Ionicons name="trash-outline" size={22} color={COLORS.danger[500]} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        
        {/* Tab Selector */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[
              styles.tabButton, 
              activeTab === 'notifications' && styles.activeTab
            ]}
            onPress={() => setActiveTab('notifications')}
          >
            <Text 
              style={[
                styles.tabText, 
                activeTab === 'notifications' && styles.activeTabText
              ]}
            >
              Notifikasi
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.tabButton, 
              activeTab === 'settings' && styles.activeTab
            ]}
            onPress={() => setActiveTab('settings')}
          >
            <Text 
              style={[
                styles.tabText, 
                activeTab === 'settings' && styles.activeTabText
              ]}
            >
              Pengaturan
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Content Area */}
        <View style={styles.content}>
          {activeTab === 'notifications' ? (
            loading ? (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={COLORS.primary.main} />
              </View>
            ) : notifications.length > 0 ? (
              <Animated.View 
                entering={FadeInDown.duration(600).springify()}
                style={{ flex: 1 }}
              >
                <FlatList
                  data={notifications}
                  renderItem={renderNotificationItem}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={handleRefresh}
                      colors={[COLORS.primary.main]}
                      tintColor={COLORS.primary.main}
                    />
                  }
                />
              </Animated.View>
            ) : (
              <EmptyNotification />
            )
          ) : (
            <Animated.View entering={FadeInDown.duration(600).springify()}>
              <NotificationSettings onRefresh={fetchNotifications} />
            </Animated.View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NotificationsScreen; 