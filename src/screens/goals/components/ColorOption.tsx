import React, { memo } from "react";
import { TouchableOpacity } from "react-native";
import { styles } from "../styles/AddGoalScreen.styles";
import { ColorOptionProps } from "../types/AddGoalScreen.types";

/**
 * Komponen untuk opsi warna
 */
const ColorOption: React.FC<ColorOptionProps> = ({
  color,
  selected,
  onSelect,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.colorOption,
        { backgroundColor: color },
        selected && styles.selectedColorOption,
      ]}
      onPress={onSelect}
    />
  );
};

export default memo(ColorOption);
