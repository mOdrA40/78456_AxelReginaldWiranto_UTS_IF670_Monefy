import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS, TYPOGRAPHY } from '../../constants/theme';

import BudgetScreen from '../../screens/budget/BudgetScreen';
import AddBudgetScreen from '../../screens/budget/AddBudgetScreen';
import EditBudgetScreen from '../../screens/budget/EditBudgetScreen';
import { BudgetStackParamList } from '../types/budget.types';

const Stack = createStackNavigator<BudgetStackParamList>();

const BudgetNavigator = () => {
  return (
    <Stack.Navigator
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
      }}
    >
      <Stack.Screen
        name="Budget"
        component={BudgetScreen}
        options={{
          title: 'Anggaran',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddBudget"
        component={AddBudgetScreen}
        options={{
          title: 'Tambah Anggaran',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditBudget"
        component={EditBudgetScreen}
        options={{
          title: 'Edit Anggaran',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default BudgetNavigator;
