import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';

// Tipe dan Style
import { notificationsStyles as styles } from '../../styles';
import { COLORS } from '../../../../constants/theme';
import { Notification } from '../../../../utils/notificationHelper';

interface NotificationItemProps {
  notification: Notification;
  onPress: (notification: Notification) => void;
  onDelete: (id: string) => void;
}

/**
 * Icon yang sesuai dengan tipe notifikasi
 */
const getIconForType = (type: string) => {
  switch (type) {
    case 'transaction':
      return 'wallet-outline';
    case 'budget':
      return 'pie-chart-outline';
    case 'goal':
      return 'flag-outline';
    case 'system':
    default:
      return 'notifications-outline';
  }
};

/**
 * Warna yang sesuai dengan tipe notifikasi
 */
const getColorForType = (type: string) => {
  switch (type) {
    case 'transaction':
      return COLORS.success[600];
    case 'budget':
      return COLORS.warning[500];
    case 'goal':
      return COLORS.info[500];
    case 'system':
    default:
      return COLORS.primary.main;
  }
};

/**
 * Format tanggal ke dalam format "X waktu yang lalu"
 */
const formatDate = (date: Date) => {
  try {
    return formatDistanceToNow(date, { addSuffix: true, locale: id });
  } catch (error) {
    return 'waktu tidak valid';
  }
};

/**
 * Komponen untuk menampilkan satu item notifikasi
 */
const NotificationItem: React.FC<NotificationItemProps> = ({ 
  notification, 
  onPress, 
  onDelete 
}) => {
  return (
    <TouchableOpacity 
      style={[
        styles.notificationItem, 
        !notification.read && styles.notificationItemUnread
      ]}
      onPress={() => onPress(notification)}
    >
      <View 
        style={[
          styles.iconContainer, 
          { backgroundColor: getColorForType(notification.type) + '20' }
        ]}
      >
        <Ionicons 
          name={getIconForType(notification.type)} 
          size={20} 
          color={getColorForType(notification.type)} 
        />
      </View>
      
      <View style={styles.textContainer}>
        <Text style={styles.notificationTitle}>{notification.title}</Text>
        <Text style={styles.notificationMessage}>{notification.message}</Text>
        <Text style={styles.notificationTime}>
          {formatDate(notification.createdAt)}
        </Text>
      </View>
      
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => onDelete(notification.id)}
      >
        <Ionicons name="close" size={18} color={COLORS.neutral[400]} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default NotificationItem; 