import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

// Types
import { GoalDetailScreenNavigationProp, GoalDetailScreenRouteProp } from './types';

// Styles
import { styles } from './styles/GoalDetailScreen.styles';

// Components
import { ProgressBar, StatusButton, TimeInfo, AddFundsForm } from './components';
import { OfflineBanner } from './components';

// Hooks
import useGoals from '../../hooks/useGoals';

// Constants
import { COLORS } from '../../constants/theme';
import { formatCurrency, formatResponsiveCurrency } from '../../utils/formatters';

/**
 * Screen untuk menampilkan detail tujuan keuangan
 */
const GoalDetailScreen: React.FC = () => {
  const navigation = useNavigation<GoalDetailScreenNavigationProp>();
  const route = useRoute<GoalDetailScreenRouteProp>();
  const { goals, updateGoal, deleteGoal, isOfflineMode } = useGoals();
  const [showAddFundsForm, setShowAddFundsForm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Mendapatkan data goal berdasarkan ID
  const goal = goals.find(g => g.id === route.params.goalId);

  // Handler untuk navigasi ke halaman edit
  const handleEdit = useCallback(() => {
    if (goal) {
      navigation.navigate('EditGoal', { goalId: goal.id });
    }
  }, [goal, navigation]);

  // Handler untuk navigasi kembali
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // Handler untuk menghapus tujuan keuangan
  const handleDelete = useCallback(async () => {
    if (!goal) return;

    Alert.alert(
      'Hapus Tujuan Keuangan',
      'Apakah Anda yakin ingin menghapus tujuan keuangan ini? Tindakan ini tidak dapat dibatalkan.',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            try {
              setIsDeleting(true);
              await deleteGoal(goal.id);
              setIsDeleting(false);
              // Kembali ke halaman sebelumnya setelah berhasil menghapus
              navigation.goBack();
            } catch (error) {
              setIsDeleting(false);
              console.error('Error deleting goal:', error);
              Alert.alert(
                'Gagal Menghapus',
                'Terjadi kesalahan saat menghapus tujuan keuangan. Silakan coba lagi.'
              );
            }
          },
        },
      ]
    );
  }, [goal, deleteGoal, navigation]);

  // Handler untuk toggle form tambah dana
  const toggleAddFundsForm = useCallback(() => {
    setShowAddFundsForm(prev => !prev);
  }, []);

  // Fungsi untuk menampilkan nilai detail saat item ditekan
  const showFullAmount = (type: string, amount: number) => {
    Alert.alert(
      `Detail ${type}`,
      `Nilai sebenarnya: ${formatCurrency(amount)}`,
      [{ text: 'OK', onPress: () => {} }]
    );
  };

  // Handler untuk tambah dana
  const handleAddFunds = useCallback(async (amount: number) => {
    if (!goal) return;

    try {
      const updatedAmount = goal.currentAmount + amount;
      
      // Update status jika sudah mencapai target
      let status = goal.status;
      if (updatedAmount >= goal.targetAmount) {
        status = 'completed';
      }
      
      await updateGoal(goal.id, {
        currentAmount: updatedAmount,
        status
      });
      
      setShowAddFundsForm(false);
      
      if (status === 'completed') {
        Alert.alert(
          'Selamat!',
          'Anda telah mencapai target tujuan keuangan ini!'
        );
      }
    } catch (error) {
      console.error('Error adding funds:', error);
      Alert.alert(
        'Gagal Menambah Dana',
        'Terjadi kesalahan saat menambahkan dana. Silakan coba lagi.'
      );
    }
  }, [goal, updateGoal]);

  // Jika goal tidak ditemukan
  if (!goal) {
    return (
      <View style={styles.container}>
        <View style={styles.notFoundContainer}>
          <Ionicons name="alert-circle-outline" size={60} color={COLORS.warning[500]} />
          <Text style={styles.notFoundText}>Tujuan tidak ditemukan</Text>
        </View>
      </View>
    );
  }

  const progressPercentage = (goal.currentAmount / goal.targetAmount) * 100;
  const remainingAmount = goal.targetAmount - goal.currentAmount;

  return (
    <View style={styles.container}>
      <OfflineBanner isOfflineMode={isOfflineMode} />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View 
          style={styles.goalHeader}
          entering={FadeInDown.duration(600).springify()}
        >
          <View style={[styles.iconContainer, { backgroundColor: goal.color }]}>
            <Ionicons name={goal.iconName as any} size={36} color={COLORS.white} />
          </View>
          
          <Text style={styles.goalName}>{goal.name}</Text>
          {goal.description && <Text style={styles.goalDescription}>{goal.description}</Text>}
          
          <StatusButton status={goal.status} />
          
          {/* Tombol Edit dan Hapus */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.editButtonNew} 
              onPress={handleEdit}
              disabled={isOfflineMode}
            >
              <Ionicons 
                name="pencil-outline" 
                size={22} 
                color={isOfflineMode ? COLORS.neutral[400] : COLORS.primary.main} 
              />
              <Text style={[
                styles.editButtonText,
                isOfflineMode && { color: COLORS.neutral[400] }
              ]}>
                Edit Tujuan
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.deleteButton} 
              onPress={handleDelete}
              disabled={isOfflineMode || isDeleting}
            >
              <Ionicons 
                name="trash-outline" 
                size={22} 
                color={isOfflineMode ? COLORS.neutral[400] : COLORS.danger[500]} 
              />
              <Text style={[
                styles.deleteButtonText,
                isOfflineMode && { color: COLORS.neutral[400] }
              ]}>
                {isDeleting ? 'Menghapus...' : 'Hapus Tujuan'}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        
        <Animated.View 
          style={styles.progressSection}
          entering={FadeInDown.delay(100).duration(600).springify()}
        >
          <View style={styles.amountContainer}>
            <View style={styles.amountColumn}>
              <Text style={styles.amountLabel}>Target</Text>
              <TouchableOpacity 
                onPress={() => showFullAmount('Target', goal.targetAmount)}
                activeOpacity={0.7}
              >
                <Text 
                  style={styles.amountValue}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  {formatResponsiveCurrency(goal.targetAmount, true, 100000)}
                </Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.amountColumn}>
              <Text style={styles.amountLabel}>Terkumpul</Text>
              <TouchableOpacity 
                onPress={() => showFullAmount('Terkumpul', goal.currentAmount)}
                activeOpacity={0.7}
              >
                <Text 
                  style={styles.amountValue}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  {formatResponsiveCurrency(goal.currentAmount, true, 100000)}
                </Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.amountColumn}>
              <Text style={styles.amountLabel}>Sisa</Text>
              <TouchableOpacity 
                onPress={() => showFullAmount('Sisa', remainingAmount)}
                activeOpacity={0.7}
              >
                <Text 
                  style={styles.amountValue}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  {formatResponsiveCurrency(remainingAmount, true, 100000)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <ProgressBar 
            progress={progressPercentage} 
            color={goal.color} 
          />
          
          <TimeInfo 
            startDate={goal.startDate} 
            endDate={goal.endDate} 
          />
        </Animated.View>
        
        {showAddFundsForm ? (
          <Animated.View 
            style={styles.formSection}
            entering={FadeInDown.delay(200).duration(600).springify()}
          >
            <AddFundsForm 
              onAddFunds={handleAddFunds} 
              onCancel={toggleAddFundsForm}
              disabled={isOfflineMode || goal.status === 'completed'}
            />
          </Animated.View>
        ) : (
          <Animated.View 
            style={styles.actionSection}
            entering={FadeInDown.delay(200).duration(600).springify()}
          >
            <TouchableOpacity
              style={[
                styles.addFundsButton,
                (isOfflineMode || goal.status === 'completed') && styles.disabledButton
              ]}
              onPress={toggleAddFundsForm}
              disabled={isOfflineMode || goal.status === 'completed'}
            >
              <Ionicons name="wallet-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.addFundsButtonText}>
                {goal.status === 'completed' ? 'Target Tercapai' : 'Tambah Dana'}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
};

export default GoalDetailScreen;
