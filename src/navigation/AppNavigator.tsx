import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@/native/icons';
import { navigationRef } from '@/native/navigation';
import AuthScreen from '@/screens/AuthScreen';
import OverviewScreen from '@/screens/OverviewScreen';
import TransactionsScreen from '@/screens/TransactionsScreen';
import ReportsScreen from '@/screens/ReportsScreen';
import SettingsScreen from '@/screens/SettingsScreen';
import AccountScreen from '@/screens/AccountScreen';
import { useAuth } from '@/lib/auth-store';
import { useTheme } from '@/lib/theme-store';
import { View, StyleSheet } from 'react-native';

type RootStackParamList = { Auth: undefined; Main: undefined };
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator();

function MainTabs() {
  const { colors } = useTheme();
  const screens = [
    ['Overview', OverviewScreen, 'grid-outline', 'grid'],
    ['Records', TransactionsScreen, 'receipt-outline', 'receipt'],
    ['Reports', ReportsScreen, 'bar-chart-outline', 'bar-chart'],
    ['Settings', SettingsScreen, 'settings-outline', 'settings'],
    ['Account', AccountScreen, 'person-circle-outline', 'person-circle'],
  ] as const;
  return <Tabs.Navigator screenOptions={({ route }) => ({
    headerShown: false,
    tabBarActiveTintColor: colors.primary,
    tabBarInactiveTintColor: colors.muted,
    tabBarStyle: {
      position: 'absolute',
      left: 14,
      right: 14,
      bottom: 12,
      height: 70,
      paddingBottom: 8,
      paddingTop: 8,
      borderTopWidth: 0,
      borderRadius: 24,
      backgroundColor: colors.surface,
      shadowColor: '#10221F',
      shadowOpacity: colors.background === '#081016' ? 0.35 : 0.12,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 8 },
      elevation: 8,
    },
    tabBarItemStyle: { borderRadius: 18 },
    tabBarLabelStyle: { fontSize: 10, fontWeight: '700', marginTop: 1 },
    tabBarIcon: ({ color, focused }) => {
      const item = screens.find(([name]) => name === route.name);
      return <View style={[styles.iconWrap, focused && { backgroundColor: colors.primarySoft }]}><Ionicons name={(focused ? item?.[3] : item?.[2]) as any} color={color} size={20} /></View>;
    },
  })}>{screens.map(([name, component]) => <Tabs.Screen key={name} name={name} component={component} />)}</Tabs.Navigator>;
}

export default function AppNavigator() {
  const { account, loading } = useAuth();
  if (loading) return null;
  return <NavigationContainer ref={navigationRef}><Stack.Navigator screenOptions={{ headerShown: false }}>{account ? <Stack.Screen name="Main" component={MainTabs} /> : <Stack.Screen name="Auth" component={AuthScreen} />}</Stack.Navigator></NavigationContainer>;
}
const styles = StyleSheet.create({ iconWrap: { height: 30, minWidth: 42, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 15 } });
