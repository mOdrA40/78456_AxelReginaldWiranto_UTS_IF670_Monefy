import { createStackNavigator } from '@react-navigation/stack';
import { COLORS, TYPOGRAPHY } from '../../constants/theme';

import TransactionsScreen from '../../screens/transactions/TransactionsScreen';
import AddTransactionScreen from '../../screens/transactions/AddTransactionScreen';
import EditTransactionScreen from '../../screens/transactions/EditTransactionScreen';
import TransactionDetailScreen from '../../screens/transactions/TransactionDetailScreen';

import { TransactionsStackParamList } from '../types';

const Stack = createStackNavigator<TransactionsStackParamList>();

const TransactionsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="TransactionsList"
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.surface,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          ...TYPOGRAPHY.h3,
          color: COLORS.text,
        },
        headerTintColor: COLORS.primary.main,
        headerBackTitleVisible: false,
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="TransactionsList" 
        component={TransactionsScreen} 
      />
      <Stack.Screen 
        name="AddTransaction" 
        component={AddTransactionScreen} 
        options={{
          title: 'Tambah Transaksi',
          headerShown: true,
        }}
      />
      <Stack.Screen 
        name="EditTransaction" 
        component={EditTransactionScreen} 
        options={{
          title: 'Edit Transaksi',
          headerShown: true,
        }}
      />
      <Stack.Screen 
        name="TransactionDetail" 
        component={TransactionDetailScreen} 
        options={{
          title: 'Detail Transaksi',
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default TransactionsNavigator;
