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
    tabBarStyle: { height: 82, paddingTop: 10, paddingBottom: 8, borderTopColor: colors.border, backgroundColor: colors.surface },
    tabBarLabelStyle: { fontSize: 10, fontWeight: '600', marginBottom: 3 },
    tabBarIcon: ({ color, focused }) => {
      const item = screens.find(([name]) => name === route.name);
      return <View style={styles.iconWrap}><Ionicons name={(focused ? item?.[3] : item?.[2]) as any} color={color} size={22} /></View>;
    },
  })}>{screens.map(([name, component]) => <Tabs.Screen key={name} name={name} component={component} />)}</Tabs.Navigator>;
}

export default function AppNavigator() {
  const { account, loading } = useAuth();
  if (loading) return null;
  return <NavigationContainer ref={navigationRef}><Stack.Navigator screenOptions={{ headerShown: false }}>{account ? <Stack.Screen name="Main" component={MainTabs} /> : <Stack.Screen name="Auth" component={AuthScreen} />}</Stack.Navigator></NavigationContainer>;
}
const styles = StyleSheet.create({ iconWrap: { height: 28, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 14 } });
