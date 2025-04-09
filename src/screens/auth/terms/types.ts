import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../../navigation/types/auth.types';

export type TermsScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Terms'>;

export interface TermsSection {
  id: string;
  title: string;
  content: string[];
} 