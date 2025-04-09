import React, { useState, useEffect, useCallback, memo, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  StatusBar,
} from 'react-native';
import { useNavigation, useRoute, RouteProp, CommonActions } from '@react-navigation/native';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import useAuth from '../../../hooks/auth/useAuth';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import Logo from '../../../components/common/Logo';

import { LoginScreenNavigationProp, LoginScreenRouteProp } from './LoginScreen.types';
import { styles } from './LoginScreen.styles';
import { validateEmail, validatePassword } from './LoginScreen.utils';
import { COLORS } from '../../../constants/theme';

/**
 * Screen untuk login
 */
const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const route = useRoute<LoginScreenRouteProp>();
  const auth = useAuth();
  const { error } = auth;
  const loading = auth.loading || false;
  
  // Ambil email dari parameter route jika ada
  const initialEmail = route.params?.email || '';
  
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  useEffect(() => {
    if (route.params?.email) {
      setEmail(route.params.email);
    }
  }, [route.params]);
  
  const validateForm = useCallback((): boolean => {
    const emailValidationResult = validateEmail(email);
    const passwordValidationResult = validatePassword(password);
    
    setEmailError(emailValidationResult);
    setPasswordError(passwordValidationResult);
    
    return !emailValidationResult && !passwordValidationResult;
  }, [email, password]);

  const getErrorMessage = (error: any): string => {
    if (!error) return '';

    const errorCode = error.code || error.message;
    switch (errorCode) {
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return 'Email atau password yang Anda masukkan salah';
      case 'auth/invalid-email':
        return 'Format email tidak valid';
      case 'auth/user-disabled':
        return 'Akun Anda telah dinonaktifkan';
      case 'auth/too-many-requests':
        return 'Terlalu banyak percobaan login. Silakan coba lagi nanti';
      case 'auth/network-request-failed':
        return 'Gagal terhubung ke server. Periksa koneksi internet Anda';
      default:
        return 'Terjadi kesalahan. Silakan coba lagi';
    }
  };
  
  const handleLogin = useCallback(async () => {
    if (!validateForm()) {
      return;
    }
    
    try {
      const auth = getAuth();
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      if (!result) {
        return;
      }
    } catch (err: any) {
      console.error('Login error:', err);
      const errorMessage = getErrorMessage(err);
      Alert.alert(
        'Gagal Masuk',
        errorMessage,
        [
          {
            text: 'OK',
            onPress: () => setPassword('')
          }
        ]
      );
    }
  }, [email, password, validateForm]);
  
  // Handle forgot password
  const handleForgotPassword = useCallback(() => {
    navigation.navigate('ForgotPassword');
  }, [navigation]);
  
  // Handle register
  const handleRegister = useCallback(() => {
    navigation.navigate('Register');
  }, [navigation]);
  
  // Toggle password visibility
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);
  
  // Effect untuk menampilkan error dari Firebase
  useEffect(() => {
    if (error) {
      const errorMessage = getErrorMessage({ message: error });
      Alert.alert('Gagal Masuk', errorMessage);
    }
  }, [error]);
  
  // Optimasi render dengan useMemo
  const formContent = useMemo(() => (
    <Animated.View entering={FadeInDown.delay(300).duration(500)} style={styles.form}>
      <View style={styles.inputContainer}>
        <Input
          label="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (emailError) setEmailError('');
          }}
          placeholder="Masukkan email Anda"
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon="mail-outline"
          error={emailError}
          leftIconColor={emailError ? COLORS.danger[500] : COLORS.primary.main}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Input
          label="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (passwordError) setPasswordError('');
          }}
          placeholder="Masukkan password Anda"
          secureTextEntry={!showPassword}
          leftIcon="lock-closed-outline"
          rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
          onRightIconPress={togglePasswordVisibility}
          error={passwordError}
          leftIconColor={passwordError ? COLORS.danger[500] : COLORS.primary.main}
        />
      </View>
      
      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={handleForgotPassword}
        activeOpacity={0.7}
      >
        <Text style={styles.forgotPasswordText}>Lupa Password?</Text>
      </TouchableOpacity>
      
      <Button
        title="Masuk"
        onPress={handleLogin}
        isLoading={loading}
        disabled={loading}
        useGradient={true}
        gradientColors={[COLORS.primary.light, COLORS.primary.main, COLORS.primary.dark]}
        style={styles.submitButton}
        textStyle={styles.buttonText}
        fullWidth
      />
    </Animated.View>
  ), [
    email, 
    password, 
    emailError, 
    passwordError, 
    showPassword, 
    loading, 
    togglePasswordVisibility, 
    handleForgotPassword, 
    handleLogin
  ]);
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <LinearGradient
            colors={[COLORS.background, COLORS.background]}
            style={styles.gradient}
          >
            <Animated.View entering={FadeIn.duration(800)} style={styles.logoContainer}>
              <Logo size={120} />
            </Animated.View>
            
            {formContent}
            
            <Animated.View 
              entering={FadeInDown.duration(600).delay(400).springify()}
              style={styles.footer}
            >
              <Text style={styles.footerText}>Belum punya akun?</Text>
              <TouchableOpacity onPress={handleRegister} activeOpacity={0.7}>
                <Text style={styles.registerLink}>Daftar</Text>
              </TouchableOpacity>
            </Animated.View>
          </LinearGradient>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default memo(LoginScreen);
