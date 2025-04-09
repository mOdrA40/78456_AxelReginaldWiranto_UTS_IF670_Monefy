import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useNetInfo } from '@react-native-community/netinfo';

// Types
import { GoalsScreenNavigationProp } from './types';

// Styles
import { styles } from './styles/GoalsScreen.styles';

// Components
import { EmptyState, ErrorState, OfflineBanner } from './components';
import GoalCard from '../../components/goals/GoalCard';

// Hooks
import useGoals from '../../hooks/useGoals';

// Constants
import { COLORS, SPACING } from '../../constants/theme';

/**
 * Screen untuk menampilkan daftar tujuan keuangan
 */
const GoalsScreen: React.FC = () => {
  const navigation = useNavigation<GoalsScreenNavigationProp>();
  const { goals, loading, error, fetchGoals, isOfflineMode } = useGoals();
  const [refreshing, setRefreshing] = useState(false);

  // Fetch data awal saat komponen mount
  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  // Handler untuk refresh data
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchGoals();
    setRefreshing(false);
  }, [fetchGoals]);

  // Handler untuk navigasi ke halaman tambah tujuan
  const handleAddGoal = useCallback(() => {
    navigation.navigate('AddGoal');
  }, [navigation]);

  // Handler untuk navigasi ke halaman detail tujuan
  const handleGoalPress = useCallback((goalId: string) => {
    navigation.navigate('GoalDetail', { goalId });
  }, [navigation]);

  // Render loading state
  if (loading && !refreshing && !goals.length) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary.main} />
          <Text style={styles.loadingText}>Memuat tujuan keuangan...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <OfflineBanner isOfflineMode={isOfflineMode} />
      
      {error && <ErrorState error={error} onRetry={fetchGoals} />}
      
      <View style={styles.content}>
        {goals.length === 0 ? (
          <EmptyState onAddGoal={handleAddGoal} />
        ) : (
          <FlatList
            data={goals}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <Animated.View
                entering={FadeInDown.delay(index * 100).springify()}
              >
                <GoalCard
                  goal={item}
                  onPress={() => handleGoalPress(item.id)}
                />
              </Animated.View>
            )}
            contentContainerStyle={{ padding: SPACING.md }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[COLORS.primary.main]}
              />
            }
          />
        )}
      </View>
      
      {/* Floating Action Button untuk menambah tujuan keuangan baru */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={handleAddGoal}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={24} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};

export default GoalsScreen;
