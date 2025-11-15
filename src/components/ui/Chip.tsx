/**
 * Chip Component
 * 標籤/芯片組件 - 用於選擇症狀、情緒等
 */

import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';
import { theme } from '@theme';

interface ChipProps {
  label: string;
  icon?: string;
  selected?: boolean;
  onPress?: () => void;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  style?: ViewStyle;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function Chip({
  label,
  icon,
  selected = false,
  onPress,
  color = theme.colors.phases.menstrual.primary,
  size = 'md',
  disabled = false,
  style,
}: ChipProps) {
  const progress = useSharedValue(selected ? 1 : 0);
  const scale = useSharedValue(1);

  React.useEffect(() => {
    progress.value = withSpring(selected ? 1 : 0);
  }, [selected]);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [theme.colors.background.tertiary, color]
    ),
    transform: [{ scale: scale.value }],
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      progress.value,
      [0, 1],
      [theme.colors.text.secondary, theme.colors.white]
    ),
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[
        styles.chip,
        styles[size],
        animatedContainerStyle,
        disabled && styles.disabled,
        style,
      ]}
    >
      {icon && <Text style={styles.icon}>{icon}</Text>}
      <Animated.Text style={[styles.label, styles[`label_${size}`], animatedTextStyle]}>
        {label}
      </Animated.Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.radius.full,
    paddingHorizontal: theme.spacing.md,
  },
  sm: {
    height: 28,
    paddingHorizontal: theme.spacing.sm,
  },
  md: {
    height: 36,
  },
  lg: {
    height: 44,
    paddingHorizontal: theme.spacing.lg,
  },
  disabled: {
    opacity: 0.5,
  },
  icon: {
    fontSize: 16,
    marginRight: theme.spacing.xs,
  },
  label: {
    fontWeight: '600',
  },
  label_sm: {
    fontSize: 12,
  },
  label_md: {
    fontSize: 14,
  },
  label_lg: {
    fontSize: 16,
  },
});
