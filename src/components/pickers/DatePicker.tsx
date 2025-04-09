import React, { useState, useCallback, memo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../../constants/theme';
import { DatePickerProps } from './DatePicker.types';
import { styles } from './DatePicker.styles';

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  minimumDate,
  maximumDate,
  error,
}) => {
  const [show, setShow] = useState(false);

  const handleChange = useCallback((event: DateTimePickerEvent, selectedDate?: Date) => {
    setShow(Platform.OS === 'ios');
    if (selectedDate && event.type !== 'dismissed') {
      onChange(selectedDate);
    }
  }, [onChange]);

  const handlePress = useCallback(() => {
    setShow(true);
  }, []);

  const formattedDate = value.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={[styles.pickerButton, error ? styles.errorBorder : null]}
        onPress={handlePress}
      >
        <Text style={styles.dateText}>{formattedDate}</Text>
        <Ionicons name="calendar-outline" size={20} color={COLORS.textSecondary} />
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}

      {show && (
        <DateTimePicker
          value={value}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
    </View>
  );
};

export default memo(DatePicker);