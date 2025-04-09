import React, { useEffect, useState, memo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { CommonActions } from '@react-navigation/native';

import { auth } from '../config/firebase';
import SplashScreen from '../screens/SplashScreen';
import AppLockScreen from '../screens/auth/AppLockScreen';
import useAuth from '../hooks/auth/useAuth';
import { COLORS } from '../constants/theme';
import { configureNotifications } from '../utils/notificationHelper';
import { SecurityProvider, useSecurity } from '../contexts/SecurityContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


import AuthNavigator from './stacks/AuthNavigator';
import MainNavigator from './stacks/MainNavigator';


const LOGIN_STATE_KEY = '@monefiy_login_state';

let IS_REGISTERING = false;

export const setIsRegistering = (value: boolean) => {
  console.log(`IS_REGISTERING changed to: ${value}`);
  IS_REGISTERING = value;
};

const AppNavigatorWithSecurity = () => {
  return (
    <SecurityProvider>
      <AppNavigatorContent />
    </SecurityProvider>
  );
};

const AppNavigatorContent = () => {
  const { user, loading } = useAuth();
  const { isLocked, unlockApp, lockApp } = useSecurity();
  const [initializing, setInitializing] = useState(true);
  const [prevUser, setPrevUser] = useState<any>(null);
  const [navigationRef, setNavigationRef] = useState<any>(null);

  const loadLoginState = async (): Promise<boolean> => {
    try {
      const loginStateJson = await AsyncStorage.getItem(LOGIN_STATE_KEY);
      if (loginStateJson) {
        const { isLoggedIn } = JSON.parse(loginStateJson);
        return isLoggedIn;
      }
      return false;
    } catch (err) {
      console.error('Error loading login state:', err);
      return false;
    }
  };

  const navigateToDashboard = () => {
    if (navigationRef && navigationRef.isReady()) {
      unlockApp();
    }
  };

  // Logging untuk debugging
  useEffect(() => {
    if (!initializing) {
      console.log('=== APP NAVIGATOR: isLocked changed to', isLocked, '===');
      console.log('Rendering AppNavigator with user:', !!user, 'isLocked:', isLocked);
    }
  }, [isLocked, initializing, user]);

  useEffect(() => {
    if (user && !prevUser && !initializing) {
      console.log('=== USER LOGGED IN, LOCKING APP ===');
      lockApp();
      
      loadLoginState().then(wasLoggedIn => {
        if (wasLoggedIn) {
          navigateToDashboard();
        }
      });
    }

    setPrevUser(user);
  }, [user, prevUser, initializing, lockApp]);

  useEffect(() => {
    configureNotifications();

    const timer = setTimeout(() => {
      console.log('Menyelesaikan inicializasi aplikasi, status user:', !!user);
      setInitializing(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (initializing || loading) {
    return <SplashScreen />;
  }
  const shouldShowLockScreen = user && isLocked && !IS_REGISTERING;
  console.log('Rendering decision - user:', !!user, 'isLocked:', isLocked, 'isRegistering:', IS_REGISTERING, 'shouldShowLockScreen:', shouldShowLockScreen);

  if (IS_REGISTERING) {
    console.log('Showing AuthNavigator because registration is in progress');
    return (
      <NavigationContainer>
        <StatusBar
          backgroundColor={COLORS.primary.main}
          barStyle="light-content"
        />
        <AuthNavigator />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer
      ref={(ref) => setNavigationRef(ref)}
    >
      <StatusBar
        backgroundColor={COLORS.primary.main}
        barStyle="light-content"
      />
      {shouldShowLockScreen ? (
        <AppLockScreen onUnlock={unlockApp} />
      ) : (
        user ? <MainNavigator /> : <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default memo(AppNavigatorWithSecurity);