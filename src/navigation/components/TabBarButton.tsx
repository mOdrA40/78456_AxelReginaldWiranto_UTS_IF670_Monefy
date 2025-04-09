import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { TransactionsStackParamList } from '../types';
import { styles } from '../styles/MainNavigator.styles';

type TabAddTransactionButtonProps = BottomTabBarButtonProps & {

};
const TabBarButton: React.FC<TabAddTransactionButtonProps> = ({
  children,
  onPress,
  ...props
}) => {
  const navigation = useNavigation<StackNavigationProp<TransactionsStackParamList>>();

  const handlePress = () => {
    navigation.navigate('AddTransaction');
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      style={styles.container}
      {...props}
    >
      <View style={styles.button}>
        {children}
      </View>
    </TouchableOpacity>
  );
};



export default memo(TabBarButton);
