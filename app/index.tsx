/**
 * Initial Route / Auth Guard
 * 初始路由 - 決定用戶應該進入哪個流程
 */

import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useUserStore, selectIsHer, selectIsPartner } from '@stores';
import { theme } from '@theme';

export default function IndexScreen() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const isHer = useUserStore(selectIsHer);
  const isPartner = useUserStore(selectIsPartner);

  useEffect(() => {
    // TODO: 實際實作中，這裡會檢查持久化的認證狀態
    // 現在先導向 onboarding

    setTimeout(() => {
      if (!isAuthenticated || !user) {
        router.replace('/(onboarding)/welcome');
      } else if (isHer) {
        router.replace('/(her)/home');
      } else if (isPartner) {
        router.replace('/(partner)/home');
      }
    }, 500);
  }, [isAuthenticated, user, isHer, isPartner]);

  return (
    <View style={{
      flex: 1,
      backgroundColor: theme.colors.background.primary,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <ActivityIndicator size="large" color={theme.colors.phases.menstrual.primary} />
    </View>
  );
}
