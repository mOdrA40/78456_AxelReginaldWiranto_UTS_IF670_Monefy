export interface AppLockScreenProps {
  onUnlock: () => void;
}

export interface PinKeypadProps {
  onKeyPress: (key: string) => void;
  onDelete: () => void;
  onBiometricPress: () => void;
  showBiometric: boolean;
  isAuthenticating: boolean;
}

export interface PinDisplayProps {
  pinLength: number;
  maxLength: number;
}

export interface EmergencyButtonProps {
  visible: boolean;
  onPress: () => void;
  pressCount: number;
}
