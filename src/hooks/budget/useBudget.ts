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
  serverTimestamp,
  onSnapshot,
  FirestoreError
} from 'firebase/firestore';

import { db } from '../../config/firebase';
import useAuth from '../useAuth';
import { Budget } from '../../types';
import { UseBudgetResult } from './types';
import { convertFirestoreDataToBudget, handleFirestoreError } from './utils';

const useBudget = (): UseBudgetResult => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { user } = useAuth();
  
  const fetchBudgets = useCallback(async () => {
    if (!user) {
      setLoading(false);
      setError('User tidak terautentikasi');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const budgetsRef = collection(db, 'budgets');
      const budgetsQuery = query(
        budgetsRef,
        where('userId', '==', user.uid),
        orderBy('startDate', 'desc')
      );
      
      const unsubscribe = onSnapshot(budgetsQuery, 
        (querySnapshot) => {
          if (querySnapshot.empty) {
            setBudgets([]);
          } else {
            const fetchedBudgets: Budget[] = [];
            
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              const budget = convertFirestoreDataToBudget(doc.id, data);
              fetchedBudgets.push(budget);
            });
            
            setBudgets(fetchedBudgets);
          }
          setLoading(false);
        },
        (error: FirestoreError) => {
          handleFirestoreError(error, setError);
          setLoading(false);
        }
      );
      
      return unsubscribe;
    } catch (err) {
      console.error('Error initializing budgets subscription:', err);
      setError('Terjadi kesalahan koneksi saat mengambil data anggaran');
      setLoading(false);
      return;
    }
  }, [user]);
  
  const getBudgetById = useCallback(async (id: string): Promise<Budget | null> => {
    if (!user) {
      setError('User tidak terautentikasi');
      return null;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const docRef = doc(db, 'budgets', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        
        if (data.userId !== user.uid) {
          setError('Anggaran tidak ditemukan');
          return null;
        }
        
        return convertFirestoreDataToBudget(docSnap.id, data);
      } else {
        setError('Anggaran tidak ditemukan');
        return null;
      }
    } catch (err) {
      console.error('Error getting budget:', err);
      setError('Terjadi kesalahan saat mengambil data anggaran');
      return null;
    } finally {
      setLoading(false);
    }
  }, [user]);
  
  const addBudget = useCallback(async (
    budget: Omit<Budget, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'spent'>
  ): Promise<Budget | null> => {
    if (!user) {
      setError('User tidak terautentikasi');
      return null;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const budgetsRef = collection(db, 'budgets');
      
      const now = new Date();
      const newBudget = {
        ...budget,
        userId: user.uid,
        spent: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      
      const docRef = await addDoc(budgetsRef, newBudget);
      
      const addedBudget: Budget = {
        id: docRef.id,
        ...budget,
        userId: user.uid,
        spent: 0,
        createdAt: now,
        updatedAt: now,
      };
      
      setBudgets((prev) => [...prev, addedBudget]);
      
      return addedBudget;
    } catch (err) {
      console.error('Error adding budget:', err);
      setError('Terjadi kesalahan saat menambahkan anggaran');
      return null;
    } finally {
      setLoading(false);
    }
  }, [user]);
  
  const updateBudget = useCallback(async (
    id: string, 
    updates: Partial<Omit<Budget, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>
  ): Promise<boolean> => {
    if (!user) {
      setError('User tidak terautentikasi');
      return false;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const budgetRef = doc(db, 'budgets', id);
      const budgetSnap = await getDoc(budgetRef);
      
      if (!budgetSnap.exists()) {
        setError('Anggaran tidak ditemukan');
        return false;
      }
      
      const budgetData = budgetSnap.data();
      if (budgetData.userId !== user.uid) {
        setError('Anda tidak memiliki akses untuk mengubah anggaran ini');
        return false;
      }
      
      await updateDoc(budgetRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
      
      setBudgets((prev) => 
        prev.map((b) => 
          b.id === id 
            ? { ...b, ...updates, updatedAt: new Date() } 
            : b
        )
      );
      
      return true;
    } catch (err) {
      console.error('Error updating budget:', err);
      setError('Terjadi kesalahan saat mengupdate anggaran');
      return false;
    } finally {
      setLoading(false);
    }
  }, [user]);
  
  const deleteBudget = useCallback(async (id: string): Promise<boolean> => {
    if (!user) {
      setError('User tidak terautentikasi');
      return false;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const budgetRef = doc(db, 'budgets', id);
      const budgetSnap = await getDoc(budgetRef);
      
      if (!budgetSnap.exists()) {
        setError('Anggaran tidak ditemukan');
        return false;
      }
      
      const budgetData = budgetSnap.data();
      if (budgetData.userId !== user.uid) {
        setError('Anda tidak memiliki akses untuk menghapus anggaran ini');
        return false;
      }
      
      await deleteDoc(budgetRef);
      
      setBudgets((prev) => prev.filter((b) => b.id !== id));
      
      return true;
    } catch (err) {
      console.error('Error deleting budget:', err);
      setError('Terjadi kesalahan saat menghapus anggaran');
      return false;
    } finally {
      setLoading(false);
    }
  }, [user]);
  
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    
    if (user) {
      const setupSubscription = async () => {
        unsubscribe = await fetchBudgets();
      };
      
      setupSubscription();
    } else {
      setBudgets([]);
    }
    
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user, fetchBudgets]);
  
  return {
    budgets,
    loading,
    error,
    fetchBudgets,
    getBudgetById,
    addBudget,
    updateBudget,
    deleteBudget,
  };
};

export default useBudget;
