import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { PersonaCard } from '../components/PersonaCard';
import { Persona } from '../types';

const personas: Persona[] = [
  { id: '1', name: 'DJ Vibe', handle: 'djvibe_official', platform: 'instagram', avatar: '🎧', followers: 12400, queueCount: 5, color: colors.primary },
  { id: '2', name: 'Party Girl', handle: 'partygirl.miami', platform: 'tiktok', avatar: '💃', followers: 18200, queueCount: 3, color: colors.tiktok },
  { id: '3', name: 'VIP Host', handle: 'vip.experience', platform: 'instagram', avatar: '🥂', followers: 8900, queueCount: 7, color: colors.accent },
  { id: '4', name: 'Club Official', handle: 'theblueprintclub', platform: 'facebook', avatar: '🏛', followers: 31000, queueCount: 2, color: colors.secondary },
  { id: '5', name: 'Nightlife Insider', handle: 'nightlife_insider', platform: 'twitter', avatar: '🌃', followers: 8900, queueCount: 8, color: colors.instagram },
  { id: '6', name: 'Hype Man', handle: 'hypeman_official', platform: 'tiktok', avatar: '🔥', followers: 6200, queueCount: 4, color: colors.error },
];

interface QueueItem {
  id: string;
  title: string;
  platform: string;
  scheduledAt: string;
  status: 'scheduled' | 'draft';
}

const personaQueues: Record<string, QueueItem[]> = {
  '1': [
    { id: 'q1', title: 'Friday Night Teaser Reel', platform: 'Instagram', scheduledAt: 'Tonight 8PM', status: 'scheduled' },
    { id: 'q2', title: 'Mixing Session BTS', platform: 'TikTok', scheduledAt: 'Sat 2PM', status: 'scheduled' },
    { id: 'q3', title: 'New Track Drop Announcement', platform: 'Instagram', scheduledAt: 'Sun 6PM', status: 'draft' },
  ],
  '2': [
    { id: 'q4', title: 'GRWM Club Night', platform: 'TikTok', scheduledAt: 'Fri 7PM', status: 'scheduled' },
    { id: 'q5', title: 'Outfit Carousel', platform: 'Instagram', scheduledAt: 'Sat 12PM', status: 'scheduled' },
  ],
  '3': [
    { id: 'q6', title: 'Table Setup Tour', platform: 'Instagram', scheduledAt: 'Fri 5PM', status: 'scheduled' },
    { id: 'q7', title: 'VIP Experience Reel', platform: 'TikTok', scheduledAt: 'Sat 8PM', status: 'scheduled' },
    { id: 'q8', title: 'Bottle Service Promo', platform: 'Instagram', scheduledAt: 'Sun 3PM', status: 'draft' },
  ],
};

export const PersonasScreen: React.FC = () => {
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);

  const queue = selectedPersona ? personaQueues[selectedPersona] || [] : [];
  const selected = personas.find((p) => p.id === selectedPersona);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Personas</Text>
        <Text style={styles.subtitle}>Manage 6 social personas</Text>

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>6</Text>
            <Text style={styles.summaryLabel}>Active Personas</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>29</Text>
            <Text style={styles.summaryLabel}>Total Queued</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>85.6K</Text>
            <Text style={styles.summaryLabel}>Combined Reach</Text>
          </View>
        </View>

        {personas.map((p) => (
          <PersonaCard
            key={p.id}
            persona={p}
            onPress={() => setSelectedPersona(selectedPersona === p.id ? null : p.id)}
          />
        ))}

        {selectedPersona && selected && (
          <View style={styles.queueSection}>
            <View style={styles.queueHeader}>
              <Text style={styles.queueTitle}>{selected.avatar} {selected.name}'s Queue</Text>
              <Text style={styles.queueCount}>{queue.length} items</Text>
            </View>

            {queue.length === 0 ? (
              <View style={styles.emptyQueue}>
                <Ionicons name="documents-outline" size={32} color={colors.textMuted} />
                <Text style={styles.emptyText}>No posts in queue</Text>
              </View>
            ) : (
              queue.map((item) => (
                <View key={item.id} style={styles.queueCard}>
                  <View style={styles.queueInfo}>
                    <Text style={styles.queueItemTitle}>{item.title}</Text>
                    <View style={styles.queueMeta}>
                      <Text style={styles.queuePlatform}>{item.platform}</Text>
                      <Text style={styles.queueDot}> - </Text>
                      <Text style={styles.queueTime}>{item.scheduledAt}</Text>
                    </View>
                  </View>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: item.status === 'scheduled' ? colors.success + '20' : colors.surfaceHighlight },
                  ]}>
                    <Text style={[
                      styles.statusText,
                      { color: item.status === 'scheduled' ? colors.success : colors.textMuted },
                    ]}>
                      {item.status}
                    </Text>
                  </View>
                </View>
              ))
            )}
          </View>
        )}
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
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 4,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryValue: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  summaryLabel: {
    color: colors.textMuted,
    fontSize: 10,
    marginTop: 4,
    textAlign: 'center',
  },
  queueSection: {
    marginTop: 20,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  queueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  queueTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  queueCount: {
    color: colors.textMuted,
    fontSize: 12,
  },
  emptyQueue: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 8,
  },
  queueCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  queueInfo: {
    flex: 1,
  },
  queueItemTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  queueMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  queuePlatform: {
    color: colors.primaryLight,
    fontSize: 12,
    fontWeight: '500',
  },
  queueDot: {
    color: colors.textMuted,
    fontSize: 12,
  },
  queueTime: {
    color: colors.textMuted,
    fontSize: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
