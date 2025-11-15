/**
 * Input Component
 * 輸入框組件 - 支援多種狀態和樣式
 */

import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  Pressable,
  Animated
} from 'react-native';
import { theme } from '@theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'filled' | 'outline';
}

export function Input({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  variant = 'filled',
  style,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [animatedValue] = useState(new Animated.Value(0));

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const borderColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [
      error ? theme.colors.semantic.error.primary : theme.colors.border.medium,
      error ? theme.colors.semantic.error.primary : theme.colors.phases.menstrual.primary,
    ],
  });

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[
          styles.label,
          error && styles.labelError,
          isFocused && styles.labelFocused,
        ]}>
          {label}
        </Text>
      )}

      <Animated.View style={[
        styles.inputContainer,
        styles[variant],
        error && styles.inputContainerError,
        { borderColor },
      ]}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={theme.colors.text.tertiary}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />

        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </Animated.View>

      {(error || hint) && (
        <Text style={[styles.hint, error && styles.hintError]}>
          {error || hint}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    ...theme.typography.styles.caption,
    fontWeight: '600',
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  labelError: {
    color: theme.colors.semantic.error.primary,
  },
  labelFocused: {
    color: theme.colors.phases.menstrual.primary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: theme.constants.inputHeight,
    borderRadius: theme.radius.lg,
    paddingHorizontal: theme.spacing.md,
  },
  default: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 0,
  },
  filled: {
    backgroundColor: theme.colors.background.tertiary,
    borderWidth: 0,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
  inputContainerError: {
    borderColor: theme.colors.semantic.error.primary,
  },
  input: {
    flex: 1,
    ...theme.typography.styles.body1,
    color: theme.colors.text.primary,
    paddingVertical: 0,
  },
  leftIcon: {
    marginRight: theme.spacing.sm,
  },
  rightIcon: {
    marginLeft: theme.spacing.sm,
  },
  hint: {
    ...theme.typography.styles.caption,
    color: theme.colors.text.tertiary,
    marginTop: theme.spacing.xs,
  },
  hintError: {
    color: theme.colors.semantic.error.primary,
  },
});
