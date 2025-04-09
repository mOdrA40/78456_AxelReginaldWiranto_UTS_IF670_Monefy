import { TextProps } from 'react-native';

export interface CurrencyFormatterProps extends TextProps {
  amount: number | undefined;
  currency?: string;
  showSymbol?: boolean;
}
