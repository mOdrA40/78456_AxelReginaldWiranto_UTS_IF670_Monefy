import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileStackParamList } from '../../../types';
import { ReactNode } from 'react';

// Re-export types from other files
export * from './help.types';
export * from './edit-profile.types';
export * from './developer.types';

/**
 * Tipe untuk navigasi ProfileScreen
 */
export type ProfileScreenNavigationProp = StackNavigationProp<ProfileStackParamList, 'ProfileDetail'>;

/**
 * Tipe untuk navigasi SecurityScreen
 */
export type SecurityScreenNavigationProp = StackNavigationProp<ProfileStackParamList, 'Security'>;

/**
 * Tipe untuk navigasi NotificationsScreen
 */
export type NotificationsScreenNavigationProp = StackNavigationProp<ProfileStackParamList, 'Notifications'>;

/**
 * Tipe untuk item menu profil
 */
export interface ProfileMenuItem {
  id: string;
  icon: string;
  title: string;
  subtitle?: string;
  rightComponent?: ReactNode;
  onPress: () => void;
  isDanger?: boolean;
}

/**
 * Tipe untuk opsi auto lock
 */
export interface AutoLockOption {
  label: string;
  value: number;
}
