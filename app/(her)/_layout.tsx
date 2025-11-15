/**
 * Her App Layout
 * Her 的應用佈局 - 包含 Tab 導航
 */

import { Tabs } from 'expo-router';
import { theme } from '@theme';

export default function HerLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.phases.menstrual.primary,
        tabBarInactiveTintColor: theme.colors.text.tertiary,
        tabBarStyle: {
          backgroundColor: theme.colors.background.tertiary,
          borderTopColor: theme.colors.border.light,
          height: theme.constants.tabBarHeight,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          ...theme.typography.styles.caption,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          // TODO: 添加圖標
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          // TODO: 添加圖標
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: 'Insights',
          // TODO: 添加圖標
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          // TODO: 添加圖標
        }}
      />
    </Tabs>
  );
}
