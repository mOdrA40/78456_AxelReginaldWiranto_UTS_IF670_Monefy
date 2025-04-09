import React, { useState, useCallback, memo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  ForgotPasswordScreenNavigationProp,
  SuccessStateProps,
  FormStateProps
} from './ForgotPasswordScreen.types';

import { validateEmail } from './ForgotPasswordScreen.utils';
import { COLORS } from '../../../constants/theme';

import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';

import useAuth from '../../../hooks/useAuth';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

import { createStyles } from './ForgotPasswordScreen.styles';
const styles = createStyles(isTablet);

const useResetPassword = () => {
  return async (email: string) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (Math.random() < 0.2) {
      throw new Error('auth/network-request-failed');
    }
    
    return;
  };
};

const SuccessState = memo<SuccessStateProps>(({ onBackToLogin }) => (
  <Animated.View
    entering={FadeInDown.duration(600).springify()}
    style={styles.successContainer}
  >
    <View style={styles.successIcon}>
      <Ionicons name="checkmark" size={isTablet ? 60 : 40} color={COLORS.success[500]} />
    </View>

    <Text style={styles.successTitle}>Email Terkirim</Text>
    <Text style={styles.successMessage}>
      Instruksi untuk reset password telah dikirim ke email Anda. Silakan cek inbox atau folder spam Anda.
    </Text>

    <Button
      title="Kembali ke Login"
      onPress={onBackToLogin}
      style={styles.resetButton}
    />
  </Animated.View>
));

const FormState = memo<FormStateProps>(({
  email,
  emailError,
  loading,
  onEmailChange,
  onValidateEmail,
  onResetPassword,
  onBackToLogin
}) => (
  <Animated.View
    entering={FadeInDown.duration(600).delay(100).springify()}
    style={styles.formContainer}
  >
    <Text style={styles.title}>Lupa Password</Text>
    <Text style={styles.subtitle}>
      Masukkan email Anda untuk menerima instruksi reset password
    </Text>

    <View style={styles.inputContainer}>
      <Input
        label="Email"
        placeholder="Masukkan email Anda"
        value={email}
        onChangeText={onEmailChange}
        onBlur={onValidateEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        error={emailError}
        leftIcon="mail-outline"
        leftIconColor={emailError ? COLORS.danger[600] : COLORS.primary.main}
      />
    </View>

    <Button
      title="Kirim Link Reset"
      onPress={onResetPassword}
      isLoading={loading}
      disabled={loading}
      style={styles.resetButton}
      useGradient={true}
      gradientColors={[COLORS.primary.light, COLORS.primary.main, COLORS.primary.dark]}
    />

    <View style={styles.loginContainer}>
      <Text style={styles.loginText}>Ingat password? </Text>
      <TouchableOpacity onPress={onBackToLogin} activeOpacity={0.7}>
        <Text style={styles.loginLink}>Masuk</Text>
      </TouchableOpacity>
    </View>
  </Animated.View>
));

SuccessState.displayName = 'SuccessState';
FormState.displayName = 'FormState';

const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();
  const { loading: authLoading } = useAuth();
  const resetPassword = useResetPassword();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorState, setShowErrorState] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleValidateEmail = useCallback(() => {
    const error = validateEmail(email);
    setEmailError(error);
    return !error;
  }, [email]);

  const getErrorMessage = (error: any): string => {
    if (!error) return '';

    const errorCode = error.code || error.message;
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'Email tidak terdaftar dalam sistem kami';
      case 'auth/invalid-email':
        return 'Format email tidak valid';
      case 'auth/too-many-requests':
        return 'Terlalu banyak permintaan. Silakan coba beberapa saat lagi';
      case 'auth/network-request-failed':
        return 'Gagal terhubung ke server. Periksa koneksi internet Anda';
      default:
        return 'Terjadi kesalahan saat mengirim email reset password';
    }
  };

  const handleResetPassword = useCallback(async () => {
    if (!handleValidateEmail()) {
      return;
    }

    try {
      setIsLoading(true);
      setShowErrorState(false);
      await resetPassword(email);
      setIsSuccess(true);
    } catch (err: any) {
      console.error('Reset password error:', err);
      setErrorMessage(getErrorMessage(err));
      setShowErrorState(true);
      setIsSuccess(false);
      setEmail('');
    } finally {
      setIsLoading(false);
    }
  }, [email, handleValidateEmail, resetPassword]);

  if (showErrorState) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
        <Animated.View 
          entering={FadeInDown.duration(500)} 
          style={styles.errorContainer}
        >
          <View style={styles.errorIconContainer}>
            <Ionicons 
              name="alert-circle" 
              size={isTablet ? 100 : 80} 
              color={COLORS.danger[500]} 
            />
          </View>
          <Text style={styles.errorTitle}>Oops!</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <Button
            title="Coba Lagi"
            onPress={() => setShowErrorState(false)}
            style={styles.errorButton}
            useGradient={true}
            gradientColors={[COLORS.primary.light, COLORS.primary.main]}
          />
          <TouchableOpacity 
            onPress={() => navigation.navigate('Login')}
            style={styles.backToLoginButton}
          >
            <Text style={styles.backToLoginText}>Kembali ke Login</Text>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {isSuccess ? (
            <Animated.View 
              entering={FadeInDown.duration(500)} 
              style={styles.successContainer}
            >
              <View style={styles.successIcon}>
                <Ionicons 
                  name="mail" 
                  size={isTablet ? 100 : 80}
                  color={COLORS.success[500]} 
                />
              </View>
              <Text style={styles.successTitle}>Email Terkirim!</Text>
              <Text style={styles.successMessage}>
                Kami telah mengirim instruksi reset password ke email Anda. 
                Silakan cek inbox atau folder spam Anda.
              </Text>
              <Button
                title="Kembali ke Login"
                onPress={() => navigation.navigate('Login')}
                style={styles.resetButton}
                useGradient={true}
                gradientColors={[COLORS.primary.light, COLORS.primary.main]}
              />
            </Animated.View>
          ) : (
            <Animated.View entering={FadeInDown.duration(500)}>
              <View style={styles.headerContainer}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.backButton}
                >
                  <Ionicons 
                    name="arrow-back" 
                    size={isTablet ? 28 : 24}
                    color={COLORS.text} 
                  />
                </TouchableOpacity>
                <Text style={styles.title}>Lupa Password</Text>
              </View>
              <Text style={styles.subtitle}>
                Masukkan email yang terdaftar. Kami akan mengirimkan instruksi untuk reset password Anda.
              </Text>
              <View style={styles.formContainer}>
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
                  editable={!isLoading}
                />

                <Button
                  title="Kirim Instruksi"
                  onPress={handleResetPassword}
                  isLoading={isLoading}
                  disabled={isLoading}
                  style={styles.submitButton}
                  useGradient={true}
                  gradientColors={[COLORS.primary.light, COLORS.primary.main, COLORS.primary.dark]}
                />

                <View style={styles.loginContainer}>
                  <Text style={styles.loginText}>Ingat password Anda? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginLink}>Masuk</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
