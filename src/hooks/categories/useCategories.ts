import { useState, useEffect, useCallback } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  FirestoreError
} from 'firebase/firestore';

import { db } from '../../config/firebase';
import useAuth from '../useAuth';
import { Category, CategoryInput, CategoryUpdate } from '../../types/category';
import { UseCategoriesResult } from './types';
import { convertFirestoreDataToCategory, handleFirestoreError } from './utils';

const useCategories = (): UseCategoriesResult => {
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchCategories = useCallback(async () => {
    if (!user) {
      setLoading(false);
      setCategories([]);
      console.log('User tidak ada (logout/belum login), batalkan subscription kategori');
      
      return () => {
        console.log('Tidak ada subscription kategori untuk dibersihkan karena user tidak ada');
      };
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log('Membuat subscription Firestore untuk kategori...');
      const categoriesRef = collection(db, 'categories');
      const q = query(
        categoriesRef, 
        where('userId', '==', user.uid),
        orderBy('name', 'asc')
      );
      
      const unsubscribe = onSnapshot(q, 
        (querySnapshot) => {
          console.log('Menerima update data kategori dari Firestore');
          const categoriesData = querySnapshot.docs.map(doc => 
            convertFirestoreDataToCategory(doc.id, doc.data())
          );
          
          setCategories(categoriesData);
          setLoading(false);
        },
        (error: FirestoreError) => {
          handleFirestoreError(error, setError);
          setLoading(false);
        }
      );
      
      console.log('Subscription kategori berhasil dibuat');
      return () => {
        console.log('Membersihkan subscription kategori');
        unsubscribe();
      };
    } catch (err) {
      console.error('Error initializing categories subscription:', err);
      setError('Gagal menginisialisasi koneksi untuk data kategori');
      setLoading(false);
      
      return () => {};
    }
  }, [user]);
  
  const getCategoryById = useCallback(async (id: string): Promise<Category | null> => {
    if (!user) {
      setError('User tidak terautentikasi');
      return null;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const docRef = doc(db, 'categories', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        
        if (data.userId !== user.uid) {
          setError('Kategori tidak ditemukan');
          return null;
        }
        
        return convertFirestoreDataToCategory(docSnap.id, data);
      } else {
        setError('Kategori tidak ditemukan');
        return null;
      }
    } catch (err) {
      console.error('Error getting category:', err);
      setError('Terjadi kesalahan saat mengambil data kategori');
      return null;
    } finally {
      setLoading(false);
    }
  }, [user]);
  
  const addCategory = useCallback(async (categoryData: CategoryInput): Promise<Category | null> => {
    if (!user) return null;

    try {
      const categoriesRef = collection(db, 'categories');
      const newCategory = {
        ...categoryData,
        userId: user.uid,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const docRef = await addDoc(categoriesRef, newCategory);
      const category = {
        id: docRef.id,
        ...newCategory,
      } as Category;

      
      return category;
    } catch (err) {
      console.error('Error adding category:', err);
      throw new Error('Gagal menambah kategori');
    }
  }, [user]);
  
  const updateCategory = useCallback(async (id: string, categoryData: CategoryUpdate): Promise<Category | null> => {
    if (!user) return null;

    try {
      const categoryRef = doc(db, 'categories', id);
      const updateData = {
        ...categoryData,
        updatedAt: new Date(),
      };

      await updateDoc(categoryRef, updateData);
      
      return { id, ...updateData } as Category;
    } catch (err) {
      console.error('Error updating category:', err);
      throw new Error('Gagal mengupdate kategori');
    }
  }, [user]);
  
  const deleteCategory = useCallback(async (id: string): Promise<void> => {
    if (!user) return;

    try {
      const categoryRef = doc(db, 'categories', id);
      await deleteDoc(categoryRef);
      
      
    } catch (err) {
      console.error('Error deleting category:', err);
      throw new Error('Gagal menghapus kategori');
    }
  }, [user]);
  
  useEffect(() => {
    let cleanupFunction: (() => void) | Promise<() => void> | undefined;
    
    if (user) {
      console.log('User ada, mulai fetch kategori');
      const setupSubscription = async () => {
        try {
          cleanupFunction = await fetchCategories();
        } catch (error) {
          console.error('Error setting up categories subscription:', error);
        }
      };
      
      setupSubscription();
    } else {
      console.log('User tidak ada, bersihkan state kategori');
      setCategories([]);
      setLoading(false);
    }
    
    return () => {
      console.log('Membersihkan subscription kategori (dari useEffect)');
      if (typeof cleanupFunction === 'function') {
        cleanupFunction();
      } else if (cleanupFunction instanceof Promise) {
        cleanupFunction.then((unsubscribeFn: () => void) => {
          if (unsubscribeFn) unsubscribeFn();
        }).catch(err => {
          console.error('Error cleaning up categories subscription:', err);
        });
      }
    };
  }, [user, fetchCategories]);
  
  return {
    categories,
    loading,
    error,
    fetchCategories,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory,
  };
};

export default useCategories;
