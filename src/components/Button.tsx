/**
 * Button Component
 * 按鈕組件
 */

import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { theme } from '@theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
}: ButtonProps) {
  const containerStyle = [
    styles.base,
    styles[variant],
    styles[`size_${size}`],
    fullWidth && styles.fullWidth,
    (disabled || loading) && styles.disabled,
    style,
  ];

  const textStyle = [
    styles.text,
    styles[`text_${variant}`],
    styles[`textSize_${size}`],
  ];

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? theme.colors.white : theme.colors.phases.menstrual.primary} />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: theme.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    ...theme.shadows.sm,
  },

  // Variants
  primary: {
    backgroundColor: theme.colors.phases.menstrual.primary,
  },
  secondary: {
    backgroundColor: theme.colors.neutral[200],
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.phases.menstrual.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },

  // Sizes
  size_sm: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    height: 36,
  },
  size_md: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    height: 48,
  },
  size_lg: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    height: 56,
  },

  fullWidth: {
    width: '100%',
  },

  disabled: {
    opacity: 0.5,
  },

  // Text styles
  text: {
    ...theme.typography.styles.button,
  },
  text_primary: {
    color: theme.colors.white,
  },
  text_secondary: {
    color: theme.colors.text.primary,
  },
  text_outline: {
    color: theme.colors.phases.menstrual.primary,
  },
  text_ghost: {
    color: theme.colors.phases.menstrual.primary,
  },

  textSize_sm: {
    fontSize: 14,
  },
  textSize_md: {
    fontSize: 16,
  },
  textSize_lg: {
    fontSize: 18,
  },
});
