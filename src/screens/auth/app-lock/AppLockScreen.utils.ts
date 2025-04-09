import * as Haptics from 'expo-haptics';
import { Vibration } from 'react-native';

export const triggerKeypadHaptic = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
};

export const triggerErrorHaptic = () => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  Vibration.vibrate(400);
};

export const triggerSuccessHaptic = () => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
};

export const generateKeypadNumbers = (): string[] => {
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  return numbers;
};

export const generateKeypadRows = (): string[][] => {
  const numbers = generateKeypadNumbers();
  return [
    numbers.slice(0, 3),
    numbers.slice(3, 6),
    numbers.slice(6, 9),
    ['', numbers[9], 'delete']
  ];
};
