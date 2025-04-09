import React, { memo } from "react";
import { View, Text } from "react-native";
import { styles } from "../styles/GoalDetailScreen.styles";
import { GoalStatus } from "../../../types/goal";
import {
  getStatusColor,
  getStatusLabel,
} from "../utils/GoalDetailScreen.utils";
import { COLORS } from "../../../constants/theme";

/**
 * Komponen untuk menampilkan status tujuan
 */
const StatusButton: React.FC<{ status: GoalStatus }> = ({ status }) => {
  const color = getStatusColor(status);
  const label = getStatusLabel(status);

  return (
    <View style={[styles.statusBadge, { backgroundColor: `${color}20` }]}>
      <Text style={[styles.statusText, { color: color }]}>
        {label}
      </Text>
    </View>
  );
};

export default memo(StatusButton);
