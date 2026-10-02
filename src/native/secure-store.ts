import AsyncStorage from '@react-native-async-storage/async-storage';
export const setItemAsync = (key: string, value: string) => AsyncStorage.setItem(key, value);
export const getItemAsync = (key: string) => AsyncStorage.getItem(key);
export const deleteItemAsync = (key: string) => AsyncStorage.removeItem(key);
