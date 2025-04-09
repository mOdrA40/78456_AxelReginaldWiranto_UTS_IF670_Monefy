import { NavigationProp } from '@react-navigation/native';
import { ReactNode } from 'react';

// Define type aliases for navigation
export type ProfileScreenNavigationProp = any;

export interface ProfileMenuItem {
  id: string;
  icon: string;
  title: string;
  subtitle?: string;
  rightComponent?: ReactNode;
  onPress: () => void;
  danger?: boolean;
} 