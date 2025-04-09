import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MainTabParamList } from '../types';

import DashboardScreen from '../../screens/dashboard/DashboardScreen';
import ReportsScreen from '../../screens/reports/ReportsScreen';

import TransactionsNavigator from './TransactionsNavigator';
import BudgetNavigator from './BudgetNavigator';
import GoalsNavigator from './GoalsNavigator';
import ProfileNavigator from './ProfileNavigator';
import MoreNavigator from './MoreNavigator';

import { TabBarButton, AddTransactionButton, TabIcon } from '../components';
import AddTransactionRedirector from '../components/AddTransactionRedirector';

import { styles } from '../styles/MainNavigator.styles';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#9E9E9E',
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: true,
        headerShown: false,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{
          tabBarLabel: 'Beranda',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="home" color={color} size={size} focused={focused} />
          )
        }}
      />
      
      <Tab.Screen 
        name="Transactions" 
        component={TransactionsNavigator}
        options={{
          tabBarLabel: 'Transaksi',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="swap-horizontal" color={color} size={size} focused={focused} />
          )
        }}
      />
      
      <Tab.Screen 
        name="AddTransaction" 
        component={AddTransactionRedirector}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => <AddTransactionButton />,
          tabBarButton: (props) => <TabBarButton {...props} />,
        }}
      />
      
      <Tab.Screen 
        name="Budget" 
        component={BudgetNavigator}
        options={{
          tabBarLabel: 'Anggaran',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="wallet" color={color} size={size} focused={focused} />
          )
        }}
      />
      
      <Tab.Screen
        name="More"
        component={MoreNavigator}
        options={{
          tabBarLabel: 'Lainnya',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="menu" color={color} size={size} focused={focused} />
          )
        }}
      />

      {/* Screen tersembunyi untuk navigasi */}
      <Tab.Screen 
        name="Goals" 
        component={GoalsNavigator}
        options={{
          tabBarButton: () => null,
          tabBarLabel: 'Tujuan',
        }}
      />
      
      <Tab.Screen 
        name="Reports" 
        component={ReportsScreen}
        options={{
          tabBarButton: () => null,
          tabBarLabel: 'Laporan',
        }}
      />
      
      <Tab.Screen 
        name="Profile" 
        component={ProfileNavigator}
        options={{
          tabBarButton: () => null,
          tabBarLabel: 'Profil',
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
