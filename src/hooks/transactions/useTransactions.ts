import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  onSnapshot,
  Unsubscribe,
  orderBy,
  limit,
  Timestamp
} from 'firebase/firestore';

import { db } from '../../config/firebase';
import useAuth from '../useAuth';
import { Transaction } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { FilterOptions, UseTransactionsResult } from './types';
import {
  convertFirestoreDataToTransaction,
  sortTransactionsByDate,
  applyFiltersToTransactions,
  calculateFinancialSummary
} from './utils';


const useTransactions = (): UseTransactionsResult => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const lastFetchTimeRef = useRef<number>(0);
  const MIN_REFRESH_INTERVAL = 2000;

  const listenerRef = useRef<Unsubscribe | null>(null);

  const { user } = useAuth();

  const hasInitializedRef = useRef<boolean>(false);
  const lastTransactionsRef = useRef<Transaction[]>([]);

  const hasSetupListener = useRef(false);

  const fetchTransactions = useCallback(async (
    filters?: FilterOptions,
    pageSize: number = 20,
    forceRefresh: boolean = true
  ): Promise<Transaction[]> => {
    console.log('fetchTransactions dipanggil dengan forceRefresh:', forceRefresh);
    if (!user) {
      console.log('User tidak ada, bersihkan state transaksi');
      setTransactions([]);
      setIsInitialized(true);
      return [];
    }

    const now = Date.now();
    if (
      !forceRefresh &&
      isInitialized &&
      transactions.length > 0 &&
      now - lastFetchTimeRef.current < MIN_REFRESH_INTERVAL
    ) {
      console.log('Transactions sudah diinisialisasi sebelumnya, skip inisialisasi ulang');
      
      const filteredTransactions = filters 
        ? applyFiltersToTransactions(transactions, filters)
        : transactions;
      
      console.log('Menggunakan data cache, jumlah transaksi:', filteredTransactions.length);
      return filteredTransactions;
    }

    setLoading(true);
    setError(null);
    lastFetchTimeRef.current = now;

    try {
      console.log('Memulai fetch transaksi dari Firestore...');
      
      const transactionsRef = collection(db, 'transactions');
      let q = query(
        transactionsRef,
        where('userId', '==', user.uid)
      );
      
      console.log('Mengeksekusi query untuk transaksi...');
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        console.log('Tidak ada transaksi ditemukan');
        setTransactions([]);
        setHasMore(false);
        setIsInitialized(true);
        hasInitializedRef.current = true;
        setLoading(false);
        return [];
      }
      
      console.log(`Berhasil mengambil ${snapshot.size} transaksi`);
      
      const fetchedTransactions: Transaction[] = [];
      
      snapshot.forEach((doc) => {
        try {
          const data = doc.data();
          const transaction = convertFirestoreDataToTransaction(doc.id, data);
          fetchedTransactions.push(transaction);
        } catch (error) {
          console.error('Error converting transaction data:', error);
        }
      });

      const sortedTransactions = sortTransactionsByDate(fetchedTransactions);
      console.log('Transaksi diurutkan berdasarkan tanggal (client-side), jumlah:', sortedTransactions.length);
      
      const paginatedTransactions = sortedTransactions.slice(0, pageSize);
      
      let finalTransactions = paginatedTransactions;
      if (filters) {
        console.log('Menerapkan filter pada hasil:', filters);
        finalTransactions = applyFiltersToTransactions(paginatedTransactions, filters);
      }
      
      if (forceRefresh || !isInitialized) {
        console.log('Memperbarui state transaksi dengan data baru');
        setTransactions(sortedTransactions);
        lastTransactionsRef.current = sortedTransactions;
      } else {
        const allTransactions = [...transactions];
        
        sortedTransactions.forEach((newTrans) => {
          const existingIndex = allTransactions.findIndex(t => t.id === newTrans.id);
          if (existingIndex === -1) {
            allTransactions.push(newTrans);
          } else {
            if (JSON.stringify(allTransactions[existingIndex]) !== JSON.stringify(newTrans)) {
              allTransactions[existingIndex] = newTrans;
            }
          }
        });
        
        const mergedSorted = sortTransactionsByDate(allTransactions);
        console.log('Menggabungkan transaksi, jumlah total:', mergedSorted.length);
        
        setTransactions(mergedSorted);
        lastTransactionsRef.current = mergedSorted;
      }
      
      setHasMore(sortedTransactions.length >= pageSize);
      setIsInitialized(true);
      hasInitializedRef.current = true;
      
      return finalTransactions;
    } catch (error: any) {
      console.error('Error fetching transactions:', error);
      setError(`Error: ${error.message || 'Terjadi kesalahan saat mengambil data transaksi'}`);
      
      if (lastTransactionsRef.current.length > 0) {
        console.log('Mengembalikan data dari cache (lastTransactionsRef)');
        return lastTransactionsRef.current;
      }
      
      return [];
    } finally {
      setLoading(false);
    }
  }, [user, isInitialized]);
  
  const setupRealtimeListener = useCallback(() => {
    if (!user) {
      console.log('User tidak ada, tidak dapat setup listener');
      return;
    }

    if (listenerRef.current) {
      console.log('Cleaning up transactions listener');
      listenerRef.current();
      listenerRef.current = null;
    }

    console.log('Setting up realtime listener for transactions');
    
    const transactionsRef = collection(db, 'transactions');
    const transactionsQuery = query(
      transactionsRef,
      where('userId', '==', user.uid)
    
    );

   
    const unsubscribe = onSnapshot(transactionsQuery, (snapshot) => {
      if (!snapshot.empty) {
        setTransactions((currentTransactions) => {
          let updatedTransactions = [...currentTransactions];
          let hasChanges = false;

         
          snapshot.docChanges().forEach((change) => {
            const data = change.doc.data();
            const transaction = convertFirestoreDataToTransaction(change.doc.id, data);

            console.log(`Received ${change.type} change for transaction:`, transaction.id);

            if (change.type === 'added') {
              const existingIndex = updatedTransactions.findIndex(t => t.id === transaction.id);
              if (existingIndex === -1) {
                updatedTransactions.push(transaction);
                hasChanges = true;
                console.log('Transaksi baru ditambahkan (realtime):', transaction.id);
              }
              hasChanges = true;
            } else if (change.type === 'modified') {
              const existingIndex = updatedTransactions.findIndex(t => t.id === transaction.id);
              if (existingIndex !== -1) {
                updatedTransactions[existingIndex] = transaction;
                hasChanges = true;
                console.log('Transaksi diperbarui (realtime):', transaction.id);
              }
            } else if (change.type === 'removed') {
              
              updatedTransactions = updatedTransactions.filter(t => t.id !== transaction.id);
              hasChanges = true;
              console.log('Transaksi dihapus (realtime):', transaction.id);
            }
          });
          
          
          const sortedTransactions = sortTransactionsByDate(updatedTransactions);
          console.log('Mengurutkan transaksi berdasarkan tanggal, jumlah:', sortedTransactions.length);
          
          
          lastTransactionsRef.current = sortedTransactions;
          
          
          if (!isInitialized) {
            setIsInitialized(true);
            hasInitializedRef.current = true;
          }
          
          return sortedTransactions;
        });
      } else if (snapshot.size === 0 && transactions.length > 0) {
     
        console.log('Tidak ada transaksi di database, mengosongkan state');
        setTransactions([]);
        lastTransactionsRef.current = [];
      }
    }, (error) => {
      
      if (error.code === 'permission-denied') {
        
        console.log('Izin tidak cukup untuk mengakses beberapa transaksi, mungkin sudah dihapus');
        
        
      } else {
        console.error('Error in realtime listener:', error);
        setError('Terjadi kesalahan saat memantau perubahan transaksi');
      }
    });

    listenerRef.current = unsubscribe;
    
    return unsubscribe;
  }, [user, isInitialized]);

  useEffect(() => {
    if (user) {
      console.log('User berubah, setup listener baru');
      setupRealtimeListener();
    } else {
      console.log('User tidak ada, bersihkan state transaksi');
      setTransactions([]);
      
      if (listenerRef.current) {
        console.log('Cleaning up transactions listener');
        listenerRef.current();
        listenerRef.current = null;
      }
    }
    
    return () => {
      if (listenerRef.current) {
        console.log('Cleaning up transactions listener');
        listenerRef.current();
        listenerRef.current = null;
      }
    };
  }, [user, setupRealtimeListener]);
  
  useEffect(() => {
    if (!user) return;
    
    if (hasSetupListener.current) {
      console.log('Listener sudah disetup sebelumnya, tidak perlu setup ulang');
      return;
    }

    if (listenerRef.current) {
      console.log('Cleaning up previous transactions listener');
      listenerRef.current();
      listenerRef.current = null;
    }

    console.log('Setting up initial transactions listener for user:', user.uid);
    
    setupRealtimeListener();
    hasSetupListener.current = true;
    
    fetchTransactions(undefined, 20, true)
      .then(() => {
        console.log('Initial transactions data loaded successfully');
      })
      .catch(err => {
        console.error('Failed to load initial transactions data:', err);
      });
    
    return () => {
      if (listenerRef.current) {
        console.log('Cleaning up transactions listener on unmount');
        listenerRef.current();
        listenerRef.current = null;
      }
    };
  }, [user, setupRealtimeListener, fetchTransactions]);

  const fetchMoreTransactions = useCallback(async (filters?: FilterOptions, pageSize: number = 20) => {
    if (!user || !hasMore) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const currentLength = transactions.length;

      const transactionsRef = collection(db, 'transactions');
      const transactionsQuery = query(
        transactionsRef,
        where('userId', '==', user.uid)
      );

      const querySnapshot = await getDocs(transactionsQuery);

      if (querySnapshot.empty) {
        setHasMore(false);
        return;
      }

      let allTransactions: Transaction[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const transaction = convertFirestoreDataToTransaction(doc.id, data);
        allTransactions.push(transaction);
      });

      allTransactions = sortTransactionsByDate(allTransactions);
      allTransactions = applyFiltersToTransactions(allTransactions, filters);

      const newPageTransactions = allTransactions.slice(currentLength, currentLength + pageSize);

      if (newPageTransactions.length > 0) {
        setTransactions((prev) => {
          const updated = [...prev, ...newPageTransactions];
          lastTransactionsRef.current = updated;
          return updated;
        });
        setHasMore(currentLength + newPageTransactions.length < allTransactions.length);
      } else {
        setHasMore(false);
      }

    } catch (err: any) {
      console.error('Error fetching more transactions:', err);

      if (err.code === 'failed-precondition' && err.message.includes('index')) {
        setError('Terjadi masalah dengan query. Silakan hubungi developer.');
      } else {
        setError('Terjadi kesalahan saat memuat transaksi tambahan');
      }
    } finally {
      setLoading(false);
    }
  }, [user, transactions.length, hasMore]);

  const getTransactionById = useCallback(async (id: string, forceRefresh: boolean = false): Promise<Transaction | null> => {
    if (!user) {
      setError('User tidak terautentikasi');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      if (!forceRefresh) {
        const cachedTransaction = transactions.find(t => t.id === id);
        if (cachedTransaction) {
          setLoading(false);
          return cachedTransaction;
        }
      }

      const docRef = doc(db, 'transactions', id);
      
      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const transaction = convertFirestoreDataToTransaction(docSnap.id, data);

          if (data.userId !== user.uid) {
            setError('Transaksi tidak ditemukan');
            return null;
          }

          setLoading(false);
          return transaction;
        } else {
          setError('Transaksi tidak ditemukan');
          return null;
        }
      } catch (docError) {
        if (docError instanceof Error && docError.toString().includes('Missing or insufficient permissions')) {
          console.log('Transaksi mungkin sudah dihapus atau tidak dapat diakses:', id);
          return null;
        }
        throw docError;
      }
    } catch (err) {
      if (err instanceof Error && err.toString().includes('Missing or insufficient permissions')) {
        setError('Transaksi tidak dapat diakses');
      } else {
        console.error('Error getting transaction:', err);
        setError('Terjadi kesalahan saat mengambil data transaksi');
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, [user, transactions]);

  const addTransaction = useCallback(async (
    transaction: Omit<Transaction, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
  ): Promise<Transaction | null> => {
    if (!user) {
      setError('User tidak terautentikasi');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const transactionData = {
        ...transaction,
        userId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, 'transactions'), transactionData);
      console.log('Transaksi baru berhasil ditambahkan dengan ID:', docRef.id);
      
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        const newTransaction = convertFirestoreDataToTransaction(docSnap.id, data);
        
        setTransactions(prev => {
          const existingIndex = prev.findIndex(t => t.id === newTransaction.id);
          if (existingIndex !== -1) {
            const updated = [...prev];
            updated[existingIndex] = newTransaction;
            lastTransactionsRef.current = sortTransactionsByDate(updated);
            return sortTransactionsByDate(updated);
          } else {
            const updated = [...prev, newTransaction];
            const sorted = sortTransactionsByDate(updated);
            lastTransactionsRef.current = sorted;
            return sorted;
          }
        });
        
        console.log('State transaksi diperbarui secara manual setelah penambahan');
        
        if (!listenerRef.current) {
          console.log('Listener belum diatur, mengatur listener baru setelah menambahkan transaksi');
          setupRealtimeListener();
        }
        
        return newTransaction;
      } else {
        throw new Error('Gagal mendapatkan data transaksi yang baru ditambahkan');
      }
    } catch (err) {
      console.error('Error adding transaction:', err);
      setError('Terjadi kesalahan saat menambahkan transaksi');
      return null;
    } finally {
      setLoading(false);
    }
  }, [user, setupRealtimeListener]);

  const updateTransaction = useCallback(async (
    id: string,
    updates: Partial<Omit<Transaction, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>
  ): Promise<boolean> => {
    if (!user) {
      setError('User tidak terautentikasi');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const transactionRef = doc(db, 'transactions', id);
      const transactionSnap = await getDoc(transactionRef);

      if (!transactionSnap.exists()) {
        setError('Transaksi tidak ditemukan');
        return false;
      }

      const transactionData = transactionSnap.data();
      if (transactionData.userId !== user.uid) {
        setError('Anda tidak memiliki akses untuk mengubah transaksi ini');
        return false;
      }

      await updateDoc(transactionRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });

      setTransactions((prev) => {
        const updatedTransactions = prev.map((t) =>
          t.id === id
            ? { ...t, ...updates, updatedAt: new Date() }
            : t
        );
        const sortedTransactions = sortTransactionsByDate(updatedTransactions);
        lastTransactionsRef.current = sortedTransactions;
        return sortedTransactions;
      });

      console.log('Transaksi berhasil diperbarui:', id);

      setTimeout(() => {
        fetchTransactions(undefined, 20, true)
          .then(() => console.log('Data transaksi diperbarui setelah mengupdate transaksi'))
          .catch(err => console.error('Gagal memperbarui data transaksi:', err));
      }, 300);

      return true;
    } catch (err) {
      console.error('Error updating transaction:', err);
      setError('Terjadi kesalahan saat mengupdate transaksi');
      return false;
    } finally {
      setLoading(false);
    }
  }, [user, fetchTransactions]);

  const deleteTransaction = useCallback(async (id: string): Promise<boolean> => {
    if (!user) {
      setError('User tidak terautentikasi');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('Memulai proses penghapusan transaksi dengan ID:', id);
      
      const existingTransaction = transactions.find(t => t.id === id);
      
      if (!existingTransaction) {
        console.log('Transaksi tidak ditemukan di state lokal, mencoba dari Firestore');
      }
      
      const transactionRef = doc(db, 'transactions', id);
      
      await deleteDoc(transactionRef);
      console.log('Dokumen transaksi berhasil dihapus dari Firestore');

      setTransactions((prev) => {
        const filtered = prev.filter((t) => t.id !== id);
        lastTransactionsRef.current = filtered;
        return filtered;
      });

      console.log('Transaksi berhasil dihapus dari state lokal:', id);

      setTimeout(() => {
        fetchTransactions(undefined, 20, true)
          .then(() => console.log('Data transaksi diperbarui setelah menghapus transaksi'))
          .catch(err => {
            if (err instanceof Error && err.toString().includes('Missing or insufficient permissions')) {
              console.log('Beberapa transaksi mungkin tidak dapat diakses setelah penghapusan');
            } else {
              console.error('Gagal memperbarui data transaksi:', err);
            }
          });
      }, 300);

      return true;
    } catch (err) {
      console.error('Error deleting transaction:', err);
      setError('Terjadi kesalahan saat menghapus transaksi');
      return false;
    } finally {
      setLoading(false);
    }
  }, [user, transactions, fetchTransactions]);

  const getFinancialSummary = useCallback(() => {
    return calculateFinancialSummary(transactions);
  }, [transactions]);

  return {
    transactions,
    loading,
    error,
    hasMore,
    isInitialized,
    fetchTransactions,
    fetchMoreTransactions,
    getTransactionById,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getFinancialSummary,
    formatCurrency,
  };
};

export default useTransactions;
