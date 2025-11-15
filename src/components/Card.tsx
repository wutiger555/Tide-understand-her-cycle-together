/**
 * Card Component
 * 卡片組件
 */

import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '@theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof typeof theme.spacing;
  accentColor?: string;
}

export function Card({ children, style, padding = 'md', accentColor }: CardProps) {
  return (
    <View
      style={[
        styles.card,
        { padding: theme.spacing[padding] },
        accentColor && { borderLeftColor: accentColor, borderLeftWidth: 4 },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.radius.lg,
    ...theme.shadows.md,
  },
});
