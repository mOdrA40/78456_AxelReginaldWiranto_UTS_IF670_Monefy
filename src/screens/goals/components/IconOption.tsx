import React, { memo } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/AddGoalScreen.styles";
import { IconOptionProps } from "../types/AddGoalScreen.types";
import { COLORS } from "../../../constants/theme";

/**
 * Komponen untuk opsi ikon yang menampilkan ikon dan label
 */
const IconOption: React.FC<IconOptionProps> = ({
  name,
  label,
  selected,
  onSelect,
}) => {
  return (
    <TouchableOpacity
      style={[styles.iconOption, selected && styles.selectedOption]}
      onPress={onSelect}
      activeOpacity={0.7}
    >
      <Ionicons
        name={name as any}
        size={28}
        color={selected ? COLORS.white : COLORS.primary.main}
      />
      <Text
        style={[styles.iconLabel, selected && styles.selectedLabel]}
        adjustsFontSizeToFit={true}
        numberOfLines={2}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(IconOption);
