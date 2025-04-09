import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const AddTransactionRedirector: React.FC = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    navigation.reset({
      index: 0,
      routes: [
        { 
          name: 'Transactions',
          state: {
            routes: [
              { name: 'TransactionsList' },
              { name: 'AddTransaction' }
            ],
            index: 1
          }
        }
      ]
    });
  }, [navigation]);
  
  return null;
};

export default AddTransactionRedirector;
