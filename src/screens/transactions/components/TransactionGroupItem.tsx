import React from 'react';
import { View, Text } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { TransactionGroupItemProps } from '../types';
import { styles } from '../styles/TransactionsScreen.styles';
import TransactionItem from './TransactionItem';

/**
 * Komponen untuk menampilkan grup transaksi berdasarkan tanggal
 */
const TransactionGroupItem: React.FC<TransactionGroupItemProps> = ({ 
  item, 
  onTransactionPress 
}) => {
  const date = new Date(item.date);
  const formattedDate = format(date, 'd MMMM yyyy', { locale: id });
  
  return (
    <Animated.View entering={FadeInDown.delay(200).springify()}>
      <View style={styles.dateGroup}>
        <Text style={styles.dateHeader}>{formattedDate}</Text>
        
        {item.transactions.map(transaction => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onPress={onTransactionPress}
          />
        ))}
      </View>
    </Animated.View>
  );
};

export default TransactionGroupItem;
