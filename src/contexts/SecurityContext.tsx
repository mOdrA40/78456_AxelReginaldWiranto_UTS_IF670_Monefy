import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';

import {
  SecuritySettings,
  DEFAULT_SECURITY_SETTINGS,
  loadSecuritySettings,
  saveSecuritySettings,
  updateLastActiveTime,
  isAuthenticationRequired,
  shouldLockApp,
} from '../utils/securityUtils';


type SecurityContextType = {
  isLocked: boolean;
  securitySettings: SecuritySettings;
  updateSecuritySettings: (settings: SecuritySettings) => Promise<void>;
  loadSecuritySettings: () => Promise<SecuritySettings>;
  lockApp: () => void;
  unlockApp: () => void;
  forceUnlock: () => void;
};

const SecurityContext = createContext<SecurityContextType>({
  isLocked: false,
  securitySettings: DEFAULT_SECURITY_SETTINGS,
  updateSecuritySettings: async () => {},
  loadSecuritySettings: async () => DEFAULT_SECURITY_SETTINGS,
  lockApp: () => {},
  unlockApp: () => {},
  forceUnlock: () => {},
});

export const useSecurity = () => useContext(SecurityContext);

type SecurityState = {
  isLocked: boolean;
  securitySettings: SecuritySettings;
  initialCheckDone: boolean;
};

type SecurityAction =
  | { type: 'LOCK_APP' }
  | { type: 'UNLOCK_APP' }
  | { type: 'FORCE_UNLOCK' }
  | { type: 'SET_SETTINGS', payload: SecuritySettings }
  | { type: 'SET_INITIAL_CHECK_DONE', payload: boolean };

const securityReducer = (state: SecurityState, action: SecurityAction): SecurityState => {
  switch (action.type) {
    case 'LOCK_APP':
      console.log('REDUCER: LOCK_APP called, current isLocked:', state.isLocked);
      return { ...state, isLocked: true };
    case 'UNLOCK_APP':
      console.log('REDUCER: UNLOCK_APP called, current isLocked:', state.isLocked);
      return { ...state, isLocked: false };
    case 'FORCE_UNLOCK':
      console.log('REDUCER: FORCE_UNLOCK called, forcing isLocked to false');
      return { ...state, isLocked: false };
    case 'SET_SETTINGS':
      return { ...state, securitySettings: action.payload };
    case 'SET_INITIAL_CHECK_DONE':
      return { ...state, initialCheckDone: action.payload };
    default:
      return state;
  }
};

export const SecurityProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [state, dispatch] = useReducer(securityReducer, {
    isLocked: false,
    securitySettings: DEFAULT_SECURITY_SETTINGS,
    initialCheckDone: false,
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        console.log('=== LOADING SECURITY SETTINGS IN CONTEXT ===');
        const settings = await loadSecuritySettings();
        dispatch({ type: 'SET_SETTINGS', payload: settings });

        const authRequired = await isAuthenticationRequired();
        console.log('Authentication required check result:', authRequired);

        if (authRequired) {
          console.log('Setting isLocked to true based on authentication check');
          dispatch({ type: 'LOCK_APP' });
        } else {
          console.log('Authentication not required, keeping isLocked as', state.isLocked);
        }

        dispatch({ type: 'SET_INITIAL_CHECK_DONE', payload: true });
      } catch (error) {
        console.error('Error loading security settings:', error);
        dispatch({ type: 'SET_INITIAL_CHECK_DONE', payload: true });
      }
    };

    loadSettings();
  }, []);

  useEffect(() => {
    if (!state.initialCheckDone) return;

    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      try {
        console.log('=== APP STATE CHANGED TO:', nextAppState, '===');
        
        if (nextAppState === 'active') {
          console.log('App became active, checking if it should be locked');
          
          if (state.securitySettings.pinEnabled && state.securitySettings.autoLockEnabled) {
            console.log('PIN and auto lock are enabled, checking timeout');
            const shouldLock = await shouldLockApp();
            console.log('Should lock based on auto lock timeout:', shouldLock);
            
            if (shouldLock) {
              console.log('Auto lock timeout exceeded, locking app');
              dispatch({ type: 'LOCK_APP' });
            } else {
              console.log('Auto lock timeout not exceeded, app remains unlocked');
              await updateLastActiveTime();
              await updateLastActiveTime();
            }
          } else {
            console.log('PIN or auto lock not enabled, not checking timeout');
          }
        } else if (nextAppState === 'background' || nextAppState === 'inactive') {
          console.log('App went to background/inactive, updating last active time');
          await updateLastActiveTime();
        }
      } catch (error) {
        console.error('Error handling app state change:', error);
      }
    };

    updateLastActiveTime();

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      console.log('Removing AppState change listener');
      subscription.remove();
    };
  }, [state.initialCheckDone, state.securitySettings]);

  const updateSecuritySettings = async (settings: SecuritySettings) => {
    try {
      console.log('=== UPDATING SECURITY SETTINGS ===');
      console.log('New settings:', JSON.stringify(settings, null, 2));

      await saveSecuritySettings(settings);

      dispatch({ type: 'SET_SETTINGS', payload: settings });

      const updatedSettings = await loadSecuritySettings();
      console.log('Security settings after update:', JSON.stringify(updatedSettings, null, 2));

      if (!settings.pinEnabled && state.isLocked) {
        console.log('PIN disabled while app is locked, unlocking app');
        dispatch({ type: 'UNLOCK_APP' });
      }

      console.log('=== SECURITY SETTINGS UPDATED ===');
    } catch (error) {
      console.error('Error updating security settings:', error);
    }
  };

  const lockApp = () => {
    console.log('=== LOCK APP CALLED ===');
    console.log('Current isLocked state before locking:', state.isLocked);
    if (state.securitySettings.pinEnabled) {
      console.log('PIN is enabled, locking app');
      dispatch({ type: 'LOCK_APP' });
    } else {
      console.log('PIN is not enabled, not locking app');
    }
  };

  const unlockApp = () => {
    console.log('=== UNLOCK APP CALLED ===');
    console.log('Current isLocked state before change:', state.isLocked);
    dispatch({ type: 'UNLOCK_APP' });
    console.log('UNLOCK_APP action dispatched');

    (async () => {
      try {
        await updateLastActiveTime();
        console.log('Last active time updated after unlock');
        setTimeout(() => {
          console.log('Checking isLocked state after timeout:', state.isLocked);
          if (state.isLocked) {
            console.log('WARNING: isLocked still true, forcing unlock');
            dispatch({ type: 'FORCE_UNLOCK' });
          }
        }, 500);
      } catch (error) {
        console.error('Error updating last active time:', error);
      }
    })();
  };

  const forceUnlock = () => {
    console.log('=== FORCE UNLOCK CALLED ===');
    dispatch({ type: 'FORCE_UNLOCK' });

    updateLastActiveTime();
    updateLastActiveTime();
  };

  return (
    <SecurityContext.Provider
      value={{
        isLocked: state.isLocked,
        securitySettings: state.securitySettings,
        updateSecuritySettings,
        loadSecuritySettings,
        lockApp,
        unlockApp,
        forceUnlock,
      }}
    >
      {children}
    </SecurityContext.Provider>
  );
};

export default SecurityContext;