import Share from 'react-native-share';
export const isAvailableAsync = async () => true;
export const shareAsync = (url: string, options?: { mimeType?: string; dialogTitle?: string }) => Share.open({ url: url.startsWith('file://') ? url : `file://${url}`, type: options?.mimeType, title: options?.dialogTitle });
