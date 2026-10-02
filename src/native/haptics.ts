import { Vibration } from 'react-native';
export const ImpactFeedbackStyle = { Light: 10, Medium: 20, Heavy: 40 } as const;
export const NotificationFeedbackType = { Success: 10, Warning: 30, Error: 50 } as const;
export const selectionAsync = async () => undefined;
export const impactAsync = async (duration = 10) => { Vibration.vibrate(duration); };
export const notificationAsync = async (duration = 10) => { Vibration.vibrate(duration); };
