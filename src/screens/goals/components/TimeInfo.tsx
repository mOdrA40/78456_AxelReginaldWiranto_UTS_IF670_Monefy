import React, { memo } from "react";
import { View, Text } from "react-native";
import { styles } from "../styles/GoalDetailScreen.styles";
import {
  calculateDaysRemaining,
  formatDate,
} from "../utils/GoalDetailScreen.utils";

/**
 * Komponen untuk menampilkan informasi waktu
 */
const TimeInfo: React.FC<{ startDate: Date; endDate: Date }> = ({ 
  startDate, 
  endDate 
}) => {
  const daysRemaining = calculateDaysRemaining(endDate);
  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  return (
    <View style={styles.timeInfo}>
      <View style={styles.timeItem}>
        <Text style={styles.timeLabel}>Tanggal Mulai</Text>
        <Text style={styles.timeValue}>{formattedStartDate}</Text>
      </View>

      <View style={styles.timeItem}>
        <Text style={styles.timeLabel}>Target Selesai</Text>
        <Text style={styles.timeValue}>{formattedEndDate}</Text>
      </View>

      <View style={styles.timeItem}>
        <Text style={styles.timeLabel}>Sisa Hari</Text>
        <Text style={styles.timeValue}>{daysRemaining}</Text>
      </View>
    </View>
  );
};

export default memo(TimeInfo);
