/**
 * Notification Service
 * 通知服務 - 處理本地通知
 */

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { addDays, startOfDay, setHours, setMinutes } from 'date-fns';

/**
 * 配置通知處理方式
 */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

/**
 * 請求通知權限
 */
export async function requestNotificationPermissions(): Promise<boolean> {
  if (!Device.isDevice) {
    console.log('Must use physical device for notifications');
    return false;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('Failed to get notification permissions');
    return false;
  }

  return true;
}

/**
 * 安排經期即將開始的提醒（給 Her）
 */
export async function schedulePeriodReminder(
  nextPeriodDate: Date,
  daysBefore: number = 3
): Promise<string | null> {
  try {
    const reminderDate = addDays(nextPeriodDate, -daysBefore);
    const reminderTime = setHours(setMinutes(startOfDay(reminderDate), 0), 9); // 早上 9:00

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Cycle Update 🌊',
        body: `Your period may start in ${daysBefore} days. Take good care of yourself.`,
        sound: true,
      },
      trigger: reminderTime,
    });

    return id;
  } catch (error) {
    console.error('Failed to schedule period reminder:', error);
    return null;
  }
}

/**
 * 安排每日記錄提醒（給 Her）
 */
export async function scheduleDailyLogReminder(time: string): Promise<string | null> {
  try {
    // time 格式: "HH:mm"
    const [hours, minutes] = time.split(':').map(Number);

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Daily Check-in 💭',
        body: 'How are you feeling today?',
        sound: true,
      },
      trigger: {
        hour: hours,
        minute: minutes,
        repeats: true,
      },
    });

    return id;
  } catch (error) {
    console.error('Failed to schedule daily log reminder:', error);
    return null;
  }
}

/**
 * 安排階段變化通知（給 Partner）
 */
export async function schedulePhaseChangeNotification(
  phaseName: string,
  phaseDate: Date
): Promise<string | null> {
  try {
    const notificationTime = setHours(setMinutes(startOfDay(phaseDate), 0), 8); // 早上 8:00

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Cycle Update 🤝',
        body: `She may be entering ${phaseName} soon. Consider being extra supportive.`,
        sound: true,
      },
      trigger: notificationTime,
    });

    return id;
  } catch (error) {
    console.error('Failed to schedule phase change notification:', error);
    return null;
  }
}

/**
 * 取消特定通知
 */
export async function cancelNotification(notificationId: string): Promise<void> {
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  } catch (error) {
    console.error('Failed to cancel notification:', error);
  }
}

/**
 * 取消所有通知
 */
export async function cancelAllNotifications(): Promise<void> {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (error) {
    console.error('Failed to cancel all notifications:', error);
  }
}

/**
 * 獲取所有已安排的通知
 */
export async function getScheduledNotifications(): Promise<Notifications.NotificationRequest[]> {
  try {
    return await Notifications.getAllScheduledNotificationsAsync();
  } catch (error) {
    console.error('Failed to get scheduled notifications:', error);
    return [];
  }
}
