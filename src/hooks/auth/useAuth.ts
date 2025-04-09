import { useState, useEffect, useCallback, useRef } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
  UserCredential,
  onAuthStateChanged
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  collection,
  getDocs,
  query,
  where,
  writeBatch,
  addDoc,
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { auth, db } from '../../config/firebase';
import { setIsRegistering } from '../../navigation/AppNavigator';
import { UserData, UseAuthResult, RegisterResult } from './types';
import { 
  saveUserToStorage, 
  loadUserFromStorage, 
  defaultIncomeCategories, 
  defaultExpenseCategories 
} from './utils';

const USER_STORAGE_KEY = '@monefiy_auth_user';
const LOGIN_STATE_KEY = '@monefiy_login_state';

const saveLoginState = async (isLoggedIn: boolean): Promise<void> => {
  try {
    await AsyncStorage.setItem(LOGIN_STATE_KEY, JSON.stringify({ isLoggedIn }));
  } catch (err) {
    console.error('Error saving login state:', err);
  }
};

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


const useAuth = (): UseAuthResult => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
 
  const isManualLogoutRef = useRef<boolean>(false);
  
  
  const fetchUserData = useCallback(async (uid: string) => {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUserData(userSnap.data() as UserData);
      } else {
        console.log('User data not found in Firestore');
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError('Gagal mengambil data pengguna');
    }
  }, []);

  useEffect(() => {
    
    let isMounted = true;
    
    let isProcessingAuthChange = false;
    
    const loadFromStorage = async () => {
      try {
        const storedUserString = await AsyncStorage.getItem(USER_STORAGE_KEY);
        if (storedUserString && isMounted) {
          const storedUser = JSON.parse(storedUserString);
          console.log('Berhasil mendapatkan user dari storage:', storedUser.displayName);
        }
      } catch (err) {
        console.error('Error loading user from storage:', err);
      }
    };
    
    loadFromStorage();
    
    
   const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      
      if (!isMounted) return;
      
  
      if (isManualLogoutRef.current) {
        console.log('Ignoring auth state change due to manual flag');
        return;
      }
      
      if (isProcessingAuthChange) return;
      isProcessingAuthChange = true;
      
      try {
        if (authUser) {
          console.log('Auth state changed: User logged in');
          setUser(authUser);
          
          
          try {
            await saveUserToStorage(authUser);
            if (isMounted) {
              await fetchUserData(authUser.uid);
            }
          } catch (fetchError) {
            console.error('Error in auth listener when fetching data:', fetchError);
          }
        } else {
          console.log('Auth state changed: User logged out');
          if (isMounted) {
            setUser(null);
            setUserData(null);
          }
          await saveUserToStorage(null);
        }
      } catch (err) {
        console.error('Error in auth state change handler:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
        isProcessingAuthChange = false;
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [fetchUserData]);
  
  const register = useCallback(async (
    name: string,
    email: string,
    password: string
  ): Promise<RegisterResult> => {
    try {
      
      setIsRegistering(true);
      
      setLoading(true);
      setError(null);
      
      
      const trimmedEmail = email.trim().toLowerCase();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      
      if (!emailRegex.test(trimmedEmail)) {
        throw new Error('Format email tidak valid. Mohon periksa kembali email Anda.');
      }
      
      isManualLogoutRef.current = true;
      
      setUser(null);
      setUserData(null);
      await saveUserToStorage(null);
      
      console.log('Creating user account...');
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        trimmedEmail,
        password
      );
      
      const { uid } = userCredential.user;
      
      console.log('Updating user profile...');
      await updateProfile(userCredential.user, { displayName: name });
      
      
      console.log('Saving user data to Firestore...');
      const userData = {
        uid,
        email: trimmedEmail,
        displayName: name || null,
        photoURL: null,
        phoneNumber: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      await setDoc(doc(db, 'users', uid), userData);
      
      console.log('Setting up initial categories...');
      const categoriesCollection = collection(db, 'categories');
      
      const categoryPromises = [...defaultIncomeCategories, ...defaultExpenseCategories].map(category => 
        addDoc(categoriesCollection, {
          userId: uid,
          name: category.name,
          icon: category.icon,
          color: category.color,
          type: category.type,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      );
      
      await Promise.all(categoryPromises);
      
      console.log('Signing out after registration...');
      await signOut(auth);
      
      setUser(null);
      setUserData(null);
      await saveUserToStorage(null);
      
      console.log('Registration complete');
      setLoading(false);
      
      setTimeout(() => {
        isManualLogoutRef.current = false;
        console.log('Auth listener reactivated');
        
        setTimeout(() => {
          setIsRegistering(false);
          console.log('Registration mode disabled');
        }, 500);
      }, 1000);
      
      return { uid, email: trimmedEmail };
    } catch (err: any) {
      console.error('Registration error:', err);
      setLoading(false);
      
      setTimeout(() => {
        isManualLogoutRef.current = false;
        
        setIsRegistering(false);
        console.log('Registration mode disabled due to error');
      }, 1000);
      
      if (err.code === 'auth/invalid-email') {
        setError('Format email tidak valid. Mohon periksa kembali email Anda.');
        throw new Error('Format email tidak valid. Mohon periksa kembali email Anda.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('Email sudah terdaftar. Silakan gunakan email lain atau login.');
        throw new Error('Email sudah terdaftar. Silakan gunakan email lain atau login.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password terlalu lemah. Gunakan minimal 6 karakter dengan kombinasi huruf dan angka.');
        throw new Error('Password terlalu lemah. Gunakan minimal 6 karakter dengan kombinasi huruf dan angka.');
      } else if (err.code === 'auth/network-request-failed') {
        setError('Koneksi internet terputus. Silakan periksa koneksi internet Anda.');
        throw new Error('Koneksi internet terputus. Silakan periksa koneksi internet Anda.');
      } else {
        setError(err.message || 'Gagal melakukan pendaftaran');
        throw err;
      }
    }
  }, []);
  
  
  const login = useCallback(async (
    email: string,
    password: string
  ): Promise<UserCredential | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      
      await saveUserToStorage(userCredential.user);
      
      await saveLoginState(true);
      
      setLoading(false);
      return userCredential;
    } catch (err: any) {
      setLoading(false);
      setError(err.code || err.message);
      return null;
    }
  }, []);
  
  const logout = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Memulai proses logout...');
      
      isManualLogoutRef.current = true;
      
      setUser(null);
      setUserData(null);
      
      await saveUserToStorage(null);
      
      setUser(null);
      setUserData(null);
      
      await saveUserToStorage(null);
      
      await saveLoginState(false);
      
      await signOut(auth);
      
      await Promise.all([
        new Promise(resolve => setTimeout(resolve, 50))
      ]);
      
      setLoading(false);
      console.log('Proses logout selesai tanpa error');
      
      setTimeout(() => {
        isManualLogoutRef.current = false;
        console.log('Auth listener diaktifkan kembali');
      }, 1000);
    } catch (err: any) {
      console.error('Error during logout:', err);
      setLoading(false);
      setError(err.message || 'Gagal melakukan logout');
      
      setTimeout(() => {
        isManualLogoutRef.current = false;
      }, 1000);
      
      throw err;
    }
  }, []);
  
  const resetPassword = useCallback(async (email: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      await sendPasswordResetEmail(auth, email);
      
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'Gagal mengirim email reset password');
      throw err;
    }
  }, []);
  
  const updateUserProfile = useCallback(async (
    data: Partial<UserData>
  ): Promise<void> => {
    try {
      if (!user) throw new Error('User tidak ditemukan');
      
      setLoading(true);
      setError(null);
      
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
      
      if (data.displayName || data.photoURL) {
        await updateProfile(user, {
          displayName: data.displayName || user.displayName,
          photoURL: data.photoURL || user.photoURL,
        });
        
        await saveUserToStorage(user);
      }
      
      await fetchUserData(user.uid);
      
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'Gagal memperbarui profil');
      throw err;
    }
  }, [user, fetchUserData]);
  
  return {
    user,
    userData,
    loading,
    error,
    register,
    login,
    logout,
    resetPassword,
    updateUserProfile,
  };
};

export default useAuth;
