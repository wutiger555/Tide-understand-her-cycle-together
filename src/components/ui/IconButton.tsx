/**
 * IconButton Component
 * 圖標按鈕組件
 */

import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { theme } from '@theme';

interface IconButtonProps {
  icon: React.ReactNode;
  onPress: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ghost' | 'filled' | 'outline';
  color?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function IconButton({
  icon,
  onPress,
  size = 'md',
  variant = 'ghost',
  color = theme.colors.phases.menstrual.primary,
  disabled = false,
  style,
}: IconButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.9);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const getBackgroundColor = () => {
    if (variant === 'filled') return color;
    if (variant === 'outline') return 'transparent';
    return 'transparent';
  };

  const getBorderColor = () => {
    if (variant === 'outline') return color;
    return 'transparent';
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[
        styles.button,
        animatedStyle,
        {
          width: sizes[size],
          height: sizes[size],
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: variant === 'outline' ? 2 : 0,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {icon}
    </AnimatedPressable>
  );
}

const sizes = {
  sm: 32,
  md: 40,
  lg: 48,
};

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
