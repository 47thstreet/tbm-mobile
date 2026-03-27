import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { DashboardScreen } from '../screens/DashboardScreen';
import { CalendarScreen } from '../screens/CalendarScreen';
import { QuickPostScreen } from '../screens/QuickPostScreen';
import { AnalyticsScreen } from '../screens/AnalyticsScreen';
import { WhatsAppScreen } from '../screens/WhatsAppScreen';
import { PersonasScreen } from '../screens/PersonasScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';

const Tab = createBottomTabNavigator();

const tabConfig: Record<string, { icon: string; label: string }> = {
  Dashboard: { icon: 'grid', label: 'Home' },
  Calendar: { icon: 'calendar', label: 'Calendar' },
  QuickPost: { icon: 'add-circle', label: 'Post' },
  Analytics: { icon: 'bar-chart', label: 'Analytics' },
  WhatsApp: { icon: 'logo-whatsapp', label: 'WhatsApp' },
  Personas: { icon: 'people', label: 'Personas' },
  Notifications: { icon: 'notifications', label: 'Alerts' },
};

export const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ focused, color, size }) => {
          const config = tabConfig[route.name];
          const iconName = focused ? config.icon : `${config.icon}-outline`;
          return (
            <View style={focused ? styles.activeIconContainer : undefined}>
              <Ionicons name={iconName as any} size={22} color={color} />
            </View>
          );
        },
        tabBarLabel: ({ focused, color }) => {
          const config = tabConfig[route.name];
          return (
            <Text style={[styles.tabLabel, { color }]}>{config.label}</Text>
          );
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="QuickPost" component={QuickPostScreen} />
      <Tab.Screen name="Analytics" component={AnalyticsScreen} />
      <Tab.Screen name="WhatsApp" component={WhatsAppScreen} />
      <Tab.Screen name="Personas" component={PersonasScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    height: 80,
    paddingBottom: 20,
    paddingTop: 8,
    position: 'absolute',
    elevation: 0,
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: '600',
    marginTop: 2,
  },
  activeIconContainer: {
    backgroundColor: colors.primary + '15',
    borderRadius: 10,
    padding: 4,
  },
});
