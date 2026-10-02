import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { AuthProvider } from '@/lib/auth-store';
import { ThemeProvider, useTheme } from '@/lib/theme-store';
import { ExpenseProvider } from '@/lib/expense-store';
import { StoragePermissionPrompt } from '@/components/common/storage-permission-dialog';
import AppNavigator from '@/navigation/AppNavigator';
function ThemedStatusBar() { const { dark } = useTheme(); return <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} />; }
export default function App() { return <SafeAreaProvider><AuthProvider><ThemeProvider><ExpenseProvider><ThemedStatusBar /><AppNavigator /><StoragePermissionPrompt /></ExpenseProvider></ThemeProvider></AuthProvider></SafeAreaProvider>; }
