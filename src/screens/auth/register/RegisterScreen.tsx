import React, { useState, useCallback, memo, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StatusBar,
  ActivityIndicator,
  Modal,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createUserWithEmailAndPassword, updateProfile, getAuth } from 'firebase/auth';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';

// Types
import { RegisterScreenNavigationProp, FormData, FormErrors } from './RegisterScreen.types';

// Components
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import Logo from '../../../components/common/Logo';

// Hooks
import useAuth from '../../../hooks/useAuth';

// Constants
import { COLORS } from '../../../constants/theme';

import { db } from '../../../config/firebase';
import { defaultExpenseCategories, defaultIncomeCategories } from '../../../hooks/auth/utils';

import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from './RegisterScreen.utils';

/**
 * Screen untuk registrasi pengguna baru
 */
const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorState, setShowErrorState] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const getErrorMessage = (error: any): string => {
    if (!error) return '';

    const errorCode = error.code || error.message;
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'Email ini sudah terdaftar. Silakan gunakan email lain atau login';
      case 'auth/invalid-email':
        return 'Format email tidak valid';
      case 'auth/operation-not-allowed':
        return 'Pendaftaran dengan email saat ini tidak diizinkan';
      case 'auth/weak-password':
        return 'Password terlalu lemah. Gunakan minimal 6 karakter';
      case 'auth/network-request-failed':
        return 'Gagal terhubung ke server. Periksa koneksi internet Anda';
      default:
        return 'Terjadi kesalahan saat mendaftar. Silakan coba lagi';
    }
  };
  
  const handleRegister = useCallback(async () => {
    // Validasi form
    const errors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(formData.password, formData.confirmPassword)
    };

    // Update error state
    setFormErrors(errors);
    
    // Cek apakah ada error
    if (errors.name || errors.email || errors.password || errors.confirmPassword) {
      return;
    }
    
    try {
      setIsLoading(true);
      setShowErrorState(false);
      
      // Gunakan Firebase Auth langsung
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      
      // Update profile dengan nama
      await updateProfile(userCredential.user, {
        displayName: formData.name
      });
      
      // Simpan data user ke Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: formData.email,
        displayName: formData.name,
        photoURL: null,
        phoneNumber: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      // Setup kategori default
      const categoriesCollection = collection(db, 'categories');
      
      const categoryPromises = [...defaultIncomeCategories, ...defaultExpenseCategories].map(category => 
        addDoc(categoriesCollection, {
          userId: userCredential.user.uid,
          name: category.name,
          icon: category.icon,
          color: category.color,
          type: category.type,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      );
      
      // Jalankan semua kategori secara paralel
      await Promise.all(categoryPromises);
      
      // Registrasi berhasil, navigasi akan ditangani oleh AppNavigator
    } catch (err: any) {
      console.error('Register error:', err);
      setErrorMessage(getErrorMessage(err));
      setShowErrorState(true);
      setFormData(prev => ({
        ...prev,
        password: '',
        confirmPassword: ''
      }));
    } finally {
      setIsLoading(false);
    }
  }, [formData]);
  
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
              size={80} 
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
            <Text style={styles.backToLoginText}>Sudah punya akun? Login</Text>
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
          <Animated.View entering={FadeInDown.duration(500)}>
            <View style={styles.headerContainer}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
              >
                <Ionicons 
                  name="arrow-back" 
                  size={24} 
                  color={COLORS.text} 
                />
              </TouchableOpacity>
              <Text style={styles.title}>Daftar Akun</Text>
            </View>
            <Text style={styles.description}>
              Buat akun baru untuk mulai mengelola keuangan Anda dengan lebih baik
            </Text>
            <View style={styles.formContainer}>
              <Input
                label="Nama Lengkap"
                value={formData.name}
                onChangeText={(text) => {
                  setFormData(prev => ({ ...prev, name: text }));
                  if (formErrors.name) {
                    setFormErrors(prev => ({ ...prev, name: '' }));
                  }
                }}
                placeholder="Masukkan nama lengkap"
                leftIcon="person-outline"
                error={formErrors.name}
                editable={!isLoading}
              />
              <Input
                label="Email"
                value={formData.email}
                onChangeText={(text) => {
                  setFormData(prev => ({ ...prev, email: text }));
                  if (formErrors.email) {
                    setFormErrors(prev => ({ ...prev, email: '' }));
                  }
                }}
                placeholder="Masukkan email"
                keyboardType="email-address"
                autoCapitalize="none"
                leftIcon="mail-outline"
                error={formErrors.email}
                editable={!isLoading}
              />
              <Input
                label="Password"
                value={formData.password}
                onChangeText={(text) => {
                  setFormData(prev => ({ ...prev, password: text }));
                  if (formErrors.password) {
                    setFormErrors(prev => ({ ...prev, password: '' }));
                  }
                }}
                placeholder="Masukkan password"
                secureTextEntry
                leftIcon="lock-closed-outline"
                error={formErrors.password}
                editable={!isLoading}
              />
              <Input
                label="Konfirmasi Password"
                value={formData.confirmPassword}
                onChangeText={(text) => {
                  setFormData(prev => ({ ...prev, confirmPassword: text }));
                  if (formErrors.confirmPassword) {
                    setFormErrors(prev => ({ ...prev, confirmPassword: '' }));
                  }
                }}
                placeholder="Masukkan password kembali"
                secureTextEntry
                leftIcon="lock-closed-outline"
                error={formErrors.confirmPassword}
                editable={!isLoading}
              />
              <Button
                title="Daftar"
                onPress={handleRegister}
                isLoading={isLoading}
                disabled={isLoading}
                style={styles.submitButton}
                useGradient={true}
                gradientColors={[COLORS.primary.light, COLORS.primary.main]}
              />
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Sudah punya akun? </Text>
                <TouchableOpacity 
                  onPress={() => navigation.navigate('Login')}
                  style={styles.loginLink}
                >
                  <Text style={styles.loginLinkText}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorIconContainer: {
    marginBottom: 20,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.danger[500],
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  errorButton: {
    marginTop: 20,
    width: '100%',
    maxWidth: 300,
  },
  backToLoginButton: {
    marginTop: 20,
    padding: 10,
  },
  backToLoginText: {
    color: COLORS.primary.main,
    fontSize: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  description: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 30,
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  formContainer: {
    padding: 20,
    gap: 16,
  },
  submitButton: {
    marginTop: 20,
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  loginLink: {
    padding: 4,
  },
  loginLinkText: {
    fontSize: 16,
    color: COLORS.primary.main,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
