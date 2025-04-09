import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../../navigation/types/auth.types';

export type RegisterScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Register'>;

export interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FormErrors {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
