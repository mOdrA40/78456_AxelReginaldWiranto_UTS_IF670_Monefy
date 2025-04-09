import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileStackParamList } from '../../../types';

/**
 * Tipe untuk navigasi HelpScreen
 */
export type HelpScreenNavigationProp = StackNavigationProp<ProfileStackParamList, 'Help'>;

/**
 * Tipe data untuk FAQ
 */
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * Tipe data untuk panduan penggunaan
 */
export interface GuideItem {
  id: string;
  title: string;
  icon: string;
  content: string[];
}
