import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileStackParamList } from '../../../types';

/**
 * Tipe untuk navigasi DeveloperScreen
 */
export type DeveloperScreenNavigationProp = StackNavigationProp<ProfileStackParamList, 'Developer'>;

/**
 * Tipe untuk social media item
 */
export interface SocialMediaItem {
  platform: string;
  icon: string;
  url: string;
}

/**
 * Tipe untuk informasi pengembang
 */
export interface DeveloperInfo {
  name: string;
  role: string;
  university: string;
  department: string;
  year: string;
  socialMedia: SocialMediaItem[];
  description: string;
}
