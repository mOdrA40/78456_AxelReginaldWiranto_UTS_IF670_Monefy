import { StyleProp, ViewStyle, TouchableOpacityProps } from 'react-native';

export type CardVariant = 'elevated' | 'outlined' | 'filled';

export interface CardBaseProps {
  children: React.ReactNode;
  variant?: CardVariant;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}

export interface CardProps extends CardBaseProps {
  onPress?: undefined;
}
export interface TouchableCardProps extends CardBaseProps, Omit<TouchableOpacityProps, 'children' | 'style'> {
  onPress: () => void;
}
export type Props = CardProps | TouchableCardProps;
