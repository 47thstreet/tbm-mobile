import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface Broadcast {
  id: string;
  name: string;
  subscribers: number;
  lastSent: string;
  status: 'active' | 'scheduled' | 'draft';
}

interface ScheduledMessage {
  id: string;
  list: string;
  content: string;
  scheduledAt: string;
  status: 'pending' | 'sent' | 'failed';
}

const broadcasts: Broadcast[] = [
  { id: '1', name: 'VIP Guest List', subscribers: 842, lastSent: '2 hours ago', status: 'active' },
  { id: '2', name: 'Weekend Events', subscribers: 2150, lastSent: '1 day ago', status: 'active' },
  { id: '3', name: 'Ladies Night', subscribers: 1340, lastSent: '3 days ago', status: 'active' },
  { id: '4', name: 'DJ Announcements', subscribers: 680, lastSent: '5 days ago', status: 'active' },
  { id: '5', name: 'Spring Break Special', subscribers: 0, lastSent: 'Never', status: 'draft' },
];

const scheduled: ScheduledMessage[] = [
  { id: '1', list: 'Weekend Events', content: 'This Friday: DJ Nova takes over! Early bird tickets...', scheduledAt: 'Tonight 6:00 PM', status: 'pending' },
  { id: '2', list: 'VIP Guest List', content: 'Exclusive: Limited VIP tables available for Saturday...', scheduledAt: 'Tomorrow 4:00 PM', status: 'pending' },
  { id: '3', list: 'Ladies Night', content: 'Free entry + complimentary drinks until midnight...', scheduledAt: 'Thu 5:00 PM', status: 'pending' },
];

const recentActivity = [
  { action: 'Broadcast sent', list: 'VIP Guest List', time: '2h ago', delivered: 834, read: 612 },
  { action: 'Broadcast sent', list: 'Weekend Events', time: '1d ago', delivered: 2089, read: 1456 },
  { action: 'New subscribers', list: 'Ladies Night', time: '2d ago', delivered: 45, read: 0 },
];

export const WhatsAppScreen: React.FC = () => {
  const handleTrigger = (name: string) => {
    Alert.alert('Trigger Broadcast', `Send broadcast to "${name}" now?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Send', style: 'default' },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>WhatsApp</Text>
            <Text style={styles.subtitle}>Broadcast & messaging</Text>
          </View>
          <View style={styles.whatsappBadge}>
            <Ionicons name="logo-whatsapp" size={20} color={colors.whatsapp} />
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>5,012</Text>
            <Text style={styles.statLabel}>Total Subscribers</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>94%</Text>
            <Text style={styles.statLabel}>Delivery Rate</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>67%</Text>
            <Text style={styles.statLabel}>Read Rate</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Broadcast Lists</Text>
        {broadcasts.map((b) => (
          <View key={b.id} style={styles.broadcastCard}>
            <View style={styles.broadcastInfo}>
              <View style={styles.broadcastHeader}>
                <Text style={styles.broadcastName}>{b.name}</Text>
                {b.status === 'draft' && (
                  <View style={styles.draftBadge}>
                    <Text style={styles.draftText}>Draft</Text>
                  </View>
                )}
              </View>
              <Text style={styles.broadcastMeta}>
                {b.subscribers.toLocaleString()} subscribers  {b.lastSent}
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.triggerBtn, b.status === 'draft' && styles.triggerDisabled]}
              onPress={() => handleTrigger(b.name)}
              disabled={b.status === 'draft'}
            >
              <Ionicons name="send" size={16} color={b.status === 'draft' ? colors.textMuted : colors.whatsapp} />
            </TouchableOpacity>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Scheduled Messages</Text>
        {scheduled.map((s) => (
          <View key={s.id} style={styles.scheduledCard}>
            <View style={[styles.timeIndicator, { backgroundColor: colors.whatsapp }]} />
            <View style={styles.scheduledInfo}>
              <Text style={styles.scheduledList}>{s.list}</Text>
              <Text style={styles.scheduledContent} numberOfLines={1}>{s.content}</Text>
              <Text style={styles.scheduledTime}>{s.scheduledAt}</Text>
            </View>
            <Ionicons name="time-outline" size={18} color={colors.textMuted} />
          </View>
        ))}

        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {recentActivity.map((a, idx) => (
          <View key={idx} style={styles.activityCard}>
            <View style={styles.activityIcon}>
              <Ionicons
                name={a.read > 0 ? 'checkmark-done' : 'person-add'}
                size={16}
                color={colors.whatsapp}
              />
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityAction}>{a.action}</Text>
              <Text style={styles.activityList}>{a.list} - {a.time}</Text>
            </View>
            {a.read > 0 && (
              <View style={styles.activityStats}>
                <Text style={styles.activityDelivered}>{a.delivered} delivered</Text>
                <Text style={styles.activityRead}>{a.read} read</Text>
              </View>
            )}
          </View>
        ))}
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
  whatsappBadge: {
    backgroundColor: colors.whatsapp + '15',
    padding: 10,
    borderRadius: 12,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: 10,
    marginTop: 4,
    textAlign: 'center',
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 4,
  },
  broadcastCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  broadcastInfo: {
    flex: 1,
  },
  broadcastHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  broadcastName: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
  draftBadge: {
    backgroundColor: colors.surfaceHighlight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  draftText: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '600',
  },
  broadcastMeta: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 3,
  },
  triggerBtn: {
    backgroundColor: colors.whatsapp + '15',
    padding: 10,
    borderRadius: 10,
  },
  triggerDisabled: {
    backgroundColor: colors.surfaceHighlight,
  },
  scheduledCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeIndicator: {
    width: 3,
    height: 32,
    borderRadius: 2,
    marginRight: 12,
  },
  scheduledInfo: {
    flex: 1,
  },
  scheduledList: {
    color: colors.whatsapp,
    fontSize: 12,
    fontWeight: '600',
  },
  scheduledContent: {
    color: colors.text,
    fontSize: 13,
    marginTop: 2,
  },
  scheduledTime: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 3,
  },
  activityCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    backgroundColor: colors.whatsapp + '15',
    padding: 8,
    borderRadius: 10,
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityAction: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
  },
  activityList: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  activityStats: {
    alignItems: 'flex-end',
  },
  activityDelivered: {
    color: colors.textSecondary,
    fontSize: 11,
  },
  activityRead: {
    color: colors.whatsapp,
    fontSize: 11,
    fontWeight: '500',
  },
});
