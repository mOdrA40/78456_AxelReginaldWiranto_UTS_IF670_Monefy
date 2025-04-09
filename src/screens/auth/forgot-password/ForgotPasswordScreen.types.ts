import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../../navigation/types/auth.types';
export type ForgotPasswordScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'ForgotPassword'>;

export interface ForgotPasswordFormState {
  email: string;
  emailError: string;
  isSuccess: boolean;
}

export interface SuccessStateProps {
  onBackToLogin: () => void;
}

export interface FormStateProps {
  email: string;
  emailError: string;
  loading: boolean;
  onEmailChange: (text: string) => void;
  onValidateEmail: () => boolean;
  onResetPassword: () => Promise<void>;
  onBackToLogin: () => void;
}
