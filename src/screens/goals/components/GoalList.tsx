import React, { memo } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { GoalListProps } from '../types/GoalsScreen.types';
import GoalCard from '../../../components/goals/GoalCard';
import { SPACING } from '../../../constants/theme';

/**
 * Komponen untuk menampilkan daftar tujuan keuangan
 */
const GoalList: React.FC<GoalListProps> = ({ 
  goals, 
  onGoalPress, 
  refreshing, 
  onRefresh 
}) => {
  return (
    <FlatList
      data={goals}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <Animated.View
          entering={FadeInDown.delay(index * 100).springify()}
        >
          <GoalCard
            goal={item}
            onPress={() => onGoalPress(item.id)}
          />
        </Animated.View>
      )}
      contentContainerStyle={{ padding: SPACING.md }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    />
  );
};

export default memo(GoalList); 