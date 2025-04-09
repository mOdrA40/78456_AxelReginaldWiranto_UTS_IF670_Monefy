import { useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeType = 'light' | 'dark';

export default function useTheme() {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('light');
  const [isSystemTheme, setIsSystemTheme] = useState(true);

  useEffect(() => {
    const loadSavedTheme = async () => {
      try {
        const savedThemeData = await AsyncStorage.getItem('@monefiy_theme');
        if (savedThemeData) {
          const { theme, useSystem } = JSON.parse(savedThemeData);
          
          if (useSystem) {
            setIsSystemTheme(true);
            const systemTheme = Appearance.getColorScheme() as ThemeType || 'light';
            setCurrentTheme(systemTheme);
          } else {
            setIsSystemTheme(false);
            setCurrentTheme(theme || 'light');
          }
        } else {
          const systemTheme = Appearance.getColorScheme() as ThemeType || 'light';
          setCurrentTheme(systemTheme);
        }
      } catch (error) {
        console.error('Error loading theme:', error);
        setCurrentTheme('light');
      }
    };

    loadSavedTheme();
  }, []);

  useEffect(() => {
    if (isSystemTheme) {
      const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        setCurrentTheme((colorScheme as ThemeType) || 'light');
      });

      return () => subscription.remove();
    }
  }, [isSystemTheme]);

  const toggleTheme = async () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(newTheme);
    setIsSystemTheme(false);
    
    try {
      await AsyncStorage.setItem(
        '@monefiy_theme',
        JSON.stringify({ theme: newTheme, useSystem: false })
      );
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const useSystemTheme = async () => {
    setIsSystemTheme(true);
    const systemTheme = Appearance.getColorScheme() as ThemeType || 'light';
    setCurrentTheme(systemTheme);
    
    try {
      await AsyncStorage.setItem(
        '@monefiy_theme',
        JSON.stringify({ theme: systemTheme, useSystem: true })
      );
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  
  const setTheme = async (theme: ThemeType) => {
    setCurrentTheme(theme);
    setIsSystemTheme(false);
    
    try {
      await AsyncStorage.setItem(
        '@monefiy_theme',
        JSON.stringify({ theme, useSystem: false })
      );
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  return {
    currentTheme,
    isSystemTheme,
    toggleTheme,
    useSystemTheme,
    setTheme,
    isDarkMode: currentTheme === 'dark',
  };
} 