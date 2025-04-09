import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../../navigation/types/auth.types';

export type PrivacyPolicyScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'PrivacyPolicy'>;

export interface PrivacySection {
  id: string;
  title: string;
  content: string[];
} 