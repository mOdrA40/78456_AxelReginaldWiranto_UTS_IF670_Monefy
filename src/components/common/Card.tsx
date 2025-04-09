import React, { memo } from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import { Props, TouchableCardProps } from './Card.types';
import { styles, createCardStyles } from './Card.styles';

const Card: React.FC<Props> = (props) => {
  const {
    children,
    variant = 'elevated',
    style,
    contentStyle
  } = props;

  const isClickable = 'onPress' in props && props.onPress !== undefined;

  const cardStyle = createCardStyles(variant);

  const renderContent = () => (
    <View style={[styles.content, contentStyle]}>
      {children}
    </View>
  );

  if (isClickable) {
    const { onPress, variant: _, style: __, contentStyle: ___, children: ____, ...touchableProps } = props as TouchableCardProps;

    return (
      <TouchableOpacity
        style={[styles.card, cardStyle, style]}
        activeOpacity={0.7}
        onPress={onPress}
        {...touchableProps}
      >
        {renderContent()}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.card, cardStyle, style]}>
      {renderContent()}
    </View>
  );
};

export default memo(Card);