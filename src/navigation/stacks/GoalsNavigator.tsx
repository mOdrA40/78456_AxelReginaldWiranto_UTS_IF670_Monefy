import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS, TYPOGRAPHY } from '../../constants/theme';

import {
  GoalsScreen,
  AddGoalScreen,
  EditGoalScreen,
  GoalDetailScreen
} from '../../screens/goals';
import { GoalsStackParamList } from '../types';

const Stack = createStackNavigator<GoalsStackParamList>();

const GoalsNavigator = () => {
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
        name="Goals"
        component={GoalsScreen}
        options={{
          title: 'Tujuan Keuangan',
        }}
      />
      <Stack.Screen
        name="AddGoal"
        component={AddGoalScreen}
        options={{
          title: 'Tambah Tujuan',
        }}
      />
      <Stack.Screen
        name="EditGoal"
        component={EditGoalScreen}
        options={{
          title: 'Edit Tujuan',
        }}
      />
      <Stack.Screen
        name="GoalDetail"
        component={GoalDetailScreen}
        options={{
          title: 'Detail Tujuan',
        }}
      />
    </Stack.Navigator>
  );
};

export default GoalsNavigator;
