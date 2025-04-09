import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  collection, 
  query, 
  where, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDoc,
  onSnapshot
} from 'firebase/firestore';

import { db } from '../../config/firebase';
import useAuth from '../useAuth';
import { Goal, GoalInput, GoalUpdate } from '../../types/goal';
import { UseGoalsResult } from './types';
import { convertFirestoreDataToGoal, handleFirestoreError } from './utils';

const useGoals = (): UseGoalsResult => {
  const { user } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  
  const subscriptionActiveRef = useRef(false);

  const fetchGoals = useCallback(async () => {
    if (!user) {
      if (loading) {
        console.log('User sedang loading, menunggu proses autentikasi...');
        return () => {
          console.log('Tidak ada subscription untuk dibersihkan karena user masih loading');
        };
      }
      
      console.log('User tidak ada (logout/belum login), batalkan subscription goals');
      setError('Mohon login untuk mengakses tujuan keuangan');
      setLoading(false);
      
      return () => {
        console.log('Tidak ada subscription untuk dibersihkan karena user tidak ada');
      };
    }

    try {
      setLoading(true);
      setError(null);
      
      const goalsRef = collection(db, 'goals');
      const q = query(
        goalsRef, 
        where('userId', '==', user.uid)
      );

      console.log('Membuat subscription goals baru untuk user...');
      
      const unsubscribe = onSnapshot(q, 
        (querySnapshot) => {
          setIsOfflineMode(false);
          const goalsData = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return convertFirestoreDataToGoal(doc.id, data);
          });

          setGoals(goalsData);
          setLoading(false);
        },
        (err) => {
          handleFirestoreError(err, setError, setIsOfflineMode);
          setLoading(false);
        }
      );
      
      subscriptionActiveRef.current = true;
      
      return () => {
        subscriptionActiveRef.current = false;
        unsubscribe();
        console.log('Subscription goals berhasil dibersihkan saat unmount');
      };
    } catch (err: any) {
      handleFirestoreError(err, setError, setIsOfflineMode);
      setLoading(false);
      return () => {
        subscriptionActiveRef.current = false;
        console.log('Subscription goals dibersihkan karena ada error');
      };
    }
  }, [user]);

  const addGoal = useCallback(async (goalData: GoalInput): Promise<Goal | null> => {
    if (!user) return null;

    try {
      const goalsRef = collection(db, 'goals');
      const newGoal = {
        ...goalData,
        userId: user.uid,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const docRef = await addDoc(goalsRef, newGoal);
      const goal = {
        id: docRef.id,
        ...newGoal,
      } as Goal;

      return goal;
    } catch (err: any) {
      console.error('Error adding goal:', err);
      throw new Error(`Gagal menambah tujuan keuangan: ${err?.message || ''}`);
    }
  }, [user]);

  const updateGoal = useCallback(async (id: string, goalData: GoalUpdate): Promise<Goal | null> => {
    if (!user) return null;

    try {
      const goalRef = doc(db, 'goals', id);
      const updateData = {
        ...goalData,
        updatedAt: new Date(),
      };

      await updateDoc(goalRef, updateData);
      
      return { id, ...updateData } as Goal;
    } catch (err: any) {
      console.error('Error updating goal:', err);
      
      if (err?.code === 'unavailable' || isOfflineMode) {
        setError('Tidak dapat mengupdate saat offline. Coba lagi nanti.');
      }
      
      throw new Error(`Gagal mengupdate tujuan keuangan: ${err?.message || ''}`);
    }
  }, [user, isOfflineMode]);

  const deleteGoal = useCallback(async (id: string): Promise<void> => {
    if (!user) return;

    try {
      const goalRef = doc(db, 'goals', id);
      await deleteDoc(goalRef);
    } catch (err: any) {
      console.error('Error deleting goal:', err);
      
      if (err?.code === 'unavailable' || isOfflineMode) {
        setError('Tidak dapat menghapus saat offline. Coba lagi nanti.');
      }
      
      throw new Error(`Gagal menghapus tujuan keuangan: ${err?.message || ''}`);
    }
  }, [user, isOfflineMode]);

  const addFundsToGoal = useCallback(async (id: string, amount: number): Promise<Goal | null> => {
    if (!user) return null;

    try {
      const goal = goals.find(g => g.id === id);
      if (!goal) throw new Error('Tujuan keuangan tidak ditemukan');

      const newAmount = goal.currentAmount + amount;
      const status = newAmount >= goal.targetAmount 
        ? 'completed' as const 
        : goal.status;

      return await updateGoal(id, {
        currentAmount: newAmount,
        status
      });
    } catch (err: any) {
      console.error('Error adding funds to goal:', err);
      throw new Error(`Gagal menambah dana ke tujuan keuangan: ${err?.message || ''}`);
    }
  }, [user, goals, updateGoal]);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    
    if (user && !subscriptionActiveRef.current) {
      console.log('Membuat subscription goals baru untuk user...');
      
      const setupSubscription = async () => {
        unsubscribe = await fetchGoals();
        console.log('Subscription goals untuk user berhasil dibuat');
      };
      
      setupSubscription();
      
      return () => {
        console.log('Membersihkan subscription goals saat unmount...');
        if (typeof unsubscribe === 'function') {
          unsubscribe();
          console.log('Subscription goals berhasil dibersihkan saat unmount');
        }
      };
    } else if (!user) {
      console.log('User tidak ada, bersihkan state goals');
      setGoals([]);
      if (!loading) {
        setError('Mohon login untuk mengakses tujuan keuangan');
      } else {
        setError(null);
      }
      setLoading(false);
    }
  }, [user]);

  return {
    goals,
    loading,
    error,
    isOfflineMode,
    fetchGoals,
    addGoal,
    updateGoal,
    deleteGoal,
    addFundsToGoal
  };
};

export default useGoals;
