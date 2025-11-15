/**
 * Calendar Screen (Her)
 * 日曆畫面 - 顯示週期日曆視圖
 */

import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@theme';

export default function CalendarScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Calendar</Text>
        <Text style={styles.placeholder}>Calendar view will be implemented here</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  content: {
    flex: 1,
    padding: theme.padding.screen,
  },
  title: {
    ...theme.typography.styles.h2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
  },
  placeholder: {
    ...theme.typography.styles.body1,
    color: theme.colors.text.tertiary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
