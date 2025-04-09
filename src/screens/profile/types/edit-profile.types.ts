import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileStackParamList } from '../../../types';

/**
 * Tipe untuk navigasi EditProfileScreen
 */
export type EditProfileScreenNavigationProp = StackNavigationProp<ProfileStackParamList, 'EditProfile'>;

/**
 * Tipe untuk data update profil
 */
export interface ProfileUpdateData {
  displayName: string;
  updatedAt: Date;
  phoneNumber?: string;
  photoURL?: string;
  [key: string]: any;
}
