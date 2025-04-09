import React, { memo } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { styles } from "../styles/GoalDetailScreen.styles";
import { ProgressBarProps } from "../types/GoalDetailScreen.types";

/**
 * Komponen untuk menampilkan progress bar
 */
const ProgressBar: React.FC<ProgressBarProps> = ({ progress, color }) => {
  const progressStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(`${progress}%`, { duration: 1000 }),
      backgroundColor: color,
    };
  });

  return (
    <View style={styles.progressBar}>
      <Animated.View style={[styles.progressFill, progressStyle]} />
    </View>
  );
};

export default memo(ProgressBar);
