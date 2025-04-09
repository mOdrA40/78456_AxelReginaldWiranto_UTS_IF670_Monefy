import React, { memo, useMemo } from 'react';
import { Text } from 'react-native';
import { formatCurrency as formatCurrencyUtil } from '../../utils/formatters';

import { CurrencyFormatterProps } from './CurrencyFormatter.types';
import { getTextStyle } from './CurrencyFormatter.styles';

const CurrencyFormatter: React.FC<CurrencyFormatterProps> = ({
  amount,
  currency = 'IDR',
  showSymbol = true,
  style,
  ...props
}) => {
  const { validAmount, formattedValue, textStyle } = useMemo(() => {
    const validAmount = amount === undefined || isNaN(Number(amount)) ? 0 : Number(amount);
    const formattedValue = formatCurrencyUtil(validAmount, showSymbol);
    const textStyle = getTextStyle(validAmount);

    return { validAmount, formattedValue, textStyle };
  }, [amount, showSymbol]);

  return (
    <Text
      style={[
        textStyle,
        style
      ]}
      {...props}
    >
      {formattedValue}
    </Text>
  );
};

export default memo(CurrencyFormatter);