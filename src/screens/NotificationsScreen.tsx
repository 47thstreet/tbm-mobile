import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { Notification } from '../types';

const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'engagement',
    title: 'Engagement Spike',
    message: 'Friday Night Reel is trending! 45.2K views and 18.4% engagement in 2 hours.',
    timestamp: '10 min ago',
    read: false,
  },
  {
    id: '2',
    type: 'campaign',
    title: 'Campaign Launched',
    message: 'Weekend Nightlife Push is now live across Instagram, TikTok, and WhatsApp.',
    timestamp: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    type: 'whatsapp',
    title: 'Broadcast Delivered',
    message: 'VIP Guest List broadcast sent to 842 subscribers. 94% delivery rate.',
    timestamp: '2 hours ago',
    read: false,
  },
  {
    id: '4',
    type: 'alert',
    title: 'Post Failed',
    message: 'Instagram carousel for VIP Host failed to publish. Token may need refresh.',
    timestamp: '3 hours ago',
    read: true,
  },
  {
    id: '5',
    type: 'engagement',
    title: 'Milestone Reached',
    message: 'Party Girl TikTok account hit 18K followers! Up 14.8% this month.',
    timestamp: '5 hours ago',
    read: true,
  },
  {
    id: '6',
    type: 'campaign',
    title: 'Scheduled Post Published',
    message: 'DJ Vibe\'s mixing session BTS video published on Instagram Stories.',
    timestamp: '6 hours ago',
    read: true,
  },
  {
    id: '7',
    type: 'whatsapp',
    title: 'High Open Rate',
    message: 'Ladies Night broadcast achieved 78% open rate - above average.',
    timestamp: '1 day ago',
    read: true,
  },
  {
    id: '8',
    type: 'campaign',
    title: 'Campaign Completed',
    message: 'Ladies Night Q1 Wrap campaign finished. 67.8K reach, 11.3% engagement.',
    timestamp: '2 days ago',
    read: true,
  },
];

const typeConfig: Record<string, { icon: string; color: string }> = {
  campaign: { icon: 'megaphone', color: colors.primary },
  engagement: { icon: 'trending-up', color: colors.success },
  alert: { icon: 'alert-circle', color: colors.error },
  whatsapp: { icon: 'logo-whatsapp', color: colors.whatsapp },
};

export const NotificationsScreen: React.FC = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const toggleRead = (id: string) => {
    setNotifications(notifications.map((n) => n.id === id ? { ...n, read: !n.read } : n));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Notifications</Text>
            <Text style={styles.subtitle}>
              {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
            </Text>
          </View>
          {unreadCount > 0 && (
            <TouchableOpacity style={styles.markAllBtn} onPress={markAllRead}>
              <Text style={styles.markAllText}>Mark all read</Text>
            </TouchableOpacity>
          )}
        </View>

        {notifications.map((n) => {
          const config = typeConfig[n.type];
          return (
            <TouchableOpacity
              key={n.id}
              style={[styles.notifCard, !n.read && styles.notifUnread]}
              onPress={() => toggleRead(n.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconContainer, { backgroundColor: config.color + '15' }]}>
                <Ionicons name={config.icon as any} size={20} color={config.color} />
              </View>
              <View style={styles.notifContent}>
                <View style={styles.notifHeader}>
                  <Text style={styles.notifTitle}>{n.title}</Text>
                  {!n.read && <View style={styles.unreadDot} />}
                </View>
                <Text style={styles.notifMessage} numberOfLines={2}>{n.message}</Text>
                <Text style={styles.notifTime}>{n.timestamp}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 4,
  },
  markAllBtn: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 4,
  },
  markAllText: {
    color: colors.primaryLight,
    fontSize: 12,
    fontWeight: '600',
  },
  notifCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notifUnread: {
    backgroundColor: colors.surface,
    borderColor: colors.primary + '30',
  },
  iconContainer: {
    padding: 10,
    borderRadius: 12,
    marginRight: 12,
  },
  notifContent: {
    flex: 1,
  },
  notifHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notifTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginLeft: 8,
  },
  notifMessage: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
  },
  notifTime: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 6,
  },
});
