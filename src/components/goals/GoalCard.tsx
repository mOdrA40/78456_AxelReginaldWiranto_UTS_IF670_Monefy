import React, { memo, useMemo } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../../constants/theme';
import { formatCurrency, formatResponsiveCurrency } from '../../utils/formatters';

import { GoalCardProps } from './GoalCard.types';
import { calculateProgress, getStatusColor, getStatusText, getRemainingDays } from './GoalCard.utils';
import { styles } from './GoalCard.styles';

const GoalCard: React.FC<GoalCardProps> = ({ goal, onPress }) => {
  const { progress, statusColor, statusText, remainingDays } = useMemo(() => {
    return {
      progress: calculateProgress(goal),
      statusColor: getStatusColor(goal.status),
      statusText: getStatusText(goal.status),
      remainingDays: getRemainingDays(goal.endDate)
    };
  }, [goal]);

  const showFullAmount = (type: 'target' | 'current', amount: number) => {
    const title = type === 'target' ? 'Detail Target' : 'Detail Terkumpul';
    
    Alert.alert(
      title,
      `Nilai sebenarnya: ${formatCurrency(amount)}`,
      [{ text: 'OK', onPress: () => {} }]
    );
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: goal.color }]}>
          <Ionicons name={goal.iconName as any} size={24} color={COLORS.white} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{goal.name}</Text>
          <Text style={styles.description} numberOfLines={1}>{goal.description}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>
            {statusText}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${Math.min(progress, 100)}%`,
                  backgroundColor: goal.color
                }
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {progress.toFixed(0)}% tercapai
          </Text>
        </View>

        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Target</Text>
            <TouchableOpacity 
              onPress={() => showFullAmount('target', goal.targetAmount)}
              activeOpacity={0.7}
            >
              <Text 
                style={styles.detailValue}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {formatResponsiveCurrency(goal.targetAmount, false, 100000)}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Terkumpul</Text>
            <TouchableOpacity 
              onPress={() => showFullAmount('current', goal.currentAmount)}
              activeOpacity={0.7}
            >
              <Text 
                style={styles.detailValue}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {formatResponsiveCurrency(goal.currentAmount, false, 100000)}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Sisa Hari</Text>
            <Text style={styles.detailValue}>{remainingDays}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(GoalCard);