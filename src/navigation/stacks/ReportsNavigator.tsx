import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS, TYPOGRAPHY } from '../../constants/theme';
import { ReportsStackParamList } from '../types';

import ReportsScreen from '../../screens/reports/ReportsScreen';

const CategoryDetailScreen = () => <React.Fragment />;
const MonthlyReportScreen = () => <React.Fragment />;

const Stack = createStackNavigator<ReportsStackParamList>();

const ReportsNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="ReportsOverview"
      screenOptions={{
        headerTitleStyle: {
          fontFamily: TYPOGRAPHY.fontFamily.semiBold,
          fontSize: TYPOGRAPHY.fontSize.lg,
          color: COLORS.neutral[800],
        },
        headerTintColor: COLORS.primary.main,
        headerStyle: {
          backgroundColor: 'white',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        cardStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen
        name="ReportsOverview"
        component={ReportsScreen}
        options={{ 
          title: 'Laporan',
          headerShown: false,
        }}
      />
      
      <Stack.Screen
        name="CategoryDetail"
        component={CategoryDetailScreen}
        options={{ 
          title: 'Detail Kategori',
        }}
      />
      
      <Stack.Screen
        name="MonthlyReport"
        component={MonthlyReportScreen}
        options={({ route }) => ({ 
          title: `Laporan ${route.params.month}/${route.params.year}`,
        })}
      />
    </Stack.Navigator>
  );
};

export default ReportsNavigator;
