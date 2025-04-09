import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { AuthStackParamList } from '../../../navigation/types/auth.types';

export type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;
export type LoginScreenRouteProp = RouteProp<AuthStackParamList, 'Login'>;
