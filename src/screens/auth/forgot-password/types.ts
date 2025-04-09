import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../../navigation/types/auth.types';

export type ForgotPasswordScreenNavigationProp = StackNavigationProp<
  AuthStackParamList, 
  'ForgotPassword'
>; 