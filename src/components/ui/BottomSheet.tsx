/**
 * BottomSheet Component
 * 底部抽屜組件 - 用於快速記錄等場景
 */

import React, { useCallback, useImperativeHandle, forwardRef } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Pressable,
  Dimensions,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { theme } from '@theme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT * 0.9;

export interface BottomSheetRef {
  open: () => void;
  close: () => void;
}

interface BottomSheetProps {
  children: React.ReactNode;
  snapPoints?: number[];
  onClose?: () => void;
}

export const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  ({ children, snapPoints = [0.5, 0.9], onClose }, ref) => {
    const translateY = useSharedValue(0);
    const opacity = useSharedValue(0);
    const [visible, setVisible] = React.useState(false);

    const open = useCallback(() => {
      setVisible(true);
      translateY.value = withSpring(MAX_TRANSLATE_Y * snapPoints[0], {
        damping: 50,
        stiffness: 400,
      });
      opacity.value = withTiming(1, { duration: 250 });
    }, [snapPoints]);

    const close = useCallback(() => {
      translateY.value = withSpring(0, {
        damping: 50,
        stiffness: 400,
      });
      opacity.value = withTiming(0, { duration: 250 }, () => {
        runOnJS(setVisible)(false);
        onClose?.();
      });
    }, [onClose]);

    useImperativeHandle(ref, () => ({
      open,
      close,
    }));

    const rBottomSheetStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: translateY.value }],
    }));

    const rBackdropStyle = useAnimatedStyle(() => ({
      opacity: opacity.value,
    }));

    return (
      <Modal
        visible={visible}
        transparent
        statusBarTranslucent
        animationType="none"
      >
        <View style={styles.container}>
          <Animated.View style={[styles.backdrop, rBackdropStyle]}>
            <Pressable style={StyleSheet.absoluteFill} onPress={close} />
          </Animated.View>

          <Animated.View style={[styles.bottomSheet, rBottomSheetStyle]}>
            <View style={styles.handle} />
            <View style={styles.content}>{children}</View>
          </Animated.View>
        </View>
      </Modal>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.overlay,
  },
  bottomSheet: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: theme.colors.background.tertiary,
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderTopLeftRadius: theme.radius['3xl'],
    borderTopRightRadius: theme.radius['3xl'],
    ...theme.shadows.xl,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: theme.colors.neutral[300],
    borderRadius: theme.radius.full,
    alignSelf: 'center',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.padding.screen,
  },
});
