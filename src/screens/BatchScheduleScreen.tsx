import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface BatchPost {
  id: string;
  persona: string;
  personaEmoji: string;
  platform: string;
  platformIcon: string;
  platformColor: string;
  title: string;
  time: string;
  day: string;
  selected: boolean;
}

const initialPosts: BatchPost[] = [
  { id: '1', persona: 'DJ Vibe', personaEmoji: '🎧', platform: 'Instagram', platformIcon: 'logo-instagram', platformColor: colors.instagram, title: 'Friday Night Teaser Reel', time: '8:00 PM', day: 'Friday', selected: false },
  { id: '2', persona: 'DJ Vibe', personaEmoji: '🎧', platform: 'TikTok', platformIcon: 'logo-tiktok', platformColor: colors.tiktok, title: 'Mixing Session BTS', time: '2:00 PM', day: 'Saturday', selected: false },
  { id: '3', persona: 'Party Girl', personaEmoji: '💃', platform: 'TikTok', platformIcon: 'logo-tiktok', platformColor: colors.tiktok, title: 'GRWM Club Night', time: '7:00 PM', day: 'Friday', selected: false },
  { id: '4', persona: 'Party Girl', personaEmoji: '💃', platform: 'Instagram', platformIcon: 'logo-instagram', platformColor: colors.instagram, title: 'Outfit Carousel', time: '12:00 PM', day: 'Saturday', selected: false },
  { id: '5', persona: 'VIP Host', personaEmoji: '🥂', platform: 'Instagram', platformIcon: 'logo-instagram', platformColor: colors.instagram, title: 'Table Setup Tour', time: '5:00 PM', day: 'Friday', selected: false },
  { id: '6', persona: 'VIP Host', personaEmoji: '🥂', platform: 'WhatsApp', platformIcon: 'logo-whatsapp', platformColor: colors.whatsapp, title: 'VIP List Reminder', time: '4:00 PM', day: 'Thursday', selected: false },
  { id: '7', persona: 'Club Official', personaEmoji: '🏛', platform: 'Facebook', platformIcon: 'logo-facebook', platformColor: colors.facebook, title: 'Event Announcement', time: '5:00 PM', day: 'Wednesday', selected: false },
  { id: '8', persona: 'Club Official', personaEmoji: '🏛', platform: 'Instagram', platformIcon: 'logo-instagram', platformColor: colors.instagram, title: 'Week Recap Stories', time: '11:00 AM', day: 'Monday', selected: false },
  { id: '9', persona: 'Nightlife Insider', personaEmoji: '🌃', platform: 'Twitter', platformIcon: 'logo-twitter', platformColor: colors.twitter, title: 'Industry Hot Take Thread', time: '12:00 PM', day: 'Tuesday', selected: false },
  { id: '10', persona: 'Hype Man', personaEmoji: '🔥', platform: 'TikTok', platformIcon: 'logo-tiktok', platformColor: colors.tiktok, title: 'Crowd Energy Compilation', time: '9:00 PM', day: 'Saturday', selected: false },
];

const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const BatchScheduleScreen: React.FC = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [filterPersona, setFilterPersona] = useState<string | null>(null);

  const selectedCount = posts.filter((p) => p.selected).length;
  const uniquePersonas = [...new Set(posts.map((p) => p.persona))];

  const togglePost = (id: string) => {
    setPosts(posts.map((p) => p.id === id ? { ...p, selected: !p.selected } : p));
  };

  const selectAll = () => {
    const filtered = filteredPosts();
    const allSelected = filtered.every((p) => p.selected);
    const filteredIds = new Set(filtered.map((p) => p.id));
    setPosts(posts.map((p) => filteredIds.has(p.id) ? { ...p, selected: !allSelected } : p));
  };

  const filteredPosts = () => {
    let result = posts;
    if (filterPersona) {
      result = result.filter((p) => p.persona === filterPersona);
    }
    return result.sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));
  };

  const handleSchedule = () => {
    const selected = posts.filter((p) => p.selected);
    if (selected.length === 0) return;
    Alert.alert(
      'Batch Schedule',
      `Schedule ${selected.length} posts across ${new Set(selected.map((s) => s.platform)).size} platforms?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Schedule All',
          onPress: () => {
            setPosts(posts.map((p) => ({ ...p, selected: false })));
            Alert.alert('Done', `${selected.length} posts scheduled successfully.`);
          },
        },
      ],
    );
  };

  const grouped = filteredPosts().reduce<Record<string, BatchPost[]>>((acc, post) => {
    if (!acc[post.day]) acc[post.day] = [];
    acc[post.day].push(post);
    return acc;
  }, {});

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View style={styles.batchBadge}>
            <Ionicons name="layers" size={16} color={colors.success} />
            <Text style={styles.batchBadgeText}>Batch Mode</Text>
          </View>
          <Text style={styles.title}>Batch Schedule</Text>
          <Text style={styles.subtitle}>Select and schedule multiple posts at once</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{posts.length}</Text>
            <Text style={styles.statLabel}>Total Posts</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: colors.primary }]}>{selectedCount}</Text>
            <Text style={styles.statLabel}>Selected</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{new Set(posts.filter((p) => p.selected).map((p) => p.platform)).size}</Text>
            <Text style={styles.statLabel}>Platforms</Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          <TouchableOpacity
            style={[styles.filterChip, !filterPersona && styles.filterActive]}
            onPress={() => setFilterPersona(null)}
          >
            <Text style={[styles.filterText, !filterPersona && styles.filterActiveText]}>All</Text>
          </TouchableOpacity>
          {uniquePersonas.map((p) => (
            <TouchableOpacity
              key={p}
              style={[styles.filterChip, filterPersona === p && styles.filterActive]}
              onPress={() => setFilterPersona(filterPersona === p ? null : p)}
            >
              <Text style={[styles.filterText, filterPersona === p && styles.filterActiveText]}>{p}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.selectAllBtn} onPress={selectAll}>
          <Ionicons name="checkbox-outline" size={16} color={colors.primaryLight} />
          <Text style={styles.selectAllText}>Select / Deselect All</Text>
        </TouchableOpacity>

        {dayOrder.map((day) => {
          const dayPosts = grouped[day];
          if (!dayPosts || dayPosts.length === 0) return null;
          return (
            <View key={day}>
              <Text style={styles.dayHeader}>{day}</Text>
              {dayPosts.map((post) => (
                <TouchableOpacity
                  key={post.id}
                  style={[styles.postCard, post.selected && styles.postSelected]}
                  onPress={() => togglePost(post.id)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.checkbox, post.selected && styles.checkboxChecked]}>
                    {post.selected && <Ionicons name="checkmark" size={14} color={colors.text} />}
                  </View>
                  <Text style={styles.postEmoji}>{post.personaEmoji}</Text>
                  <View style={styles.postInfo}>
                    <Text style={styles.postTitle}>{post.title}</Text>
                    <View style={styles.postMeta}>
                      <Text style={styles.postPersona}>{post.persona}</Text>
                      <Ionicons name={post.platformIcon as any} size={12} color={post.platformColor} />
                      <Text style={[styles.postPlatform, { color: post.platformColor }]}>{post.platform}</Text>
                    </View>
                  </View>
                  <Text style={styles.postTime}>{post.time}</Text>
                </TouchableOpacity>
              ))}
            </View>
          );
        })}
      </ScrollView>

      {selectedCount > 0 && (
        <View style={styles.bottomBar}>
          <View style={styles.bottomInfo}>
            <Text style={styles.bottomCount}>{selectedCount} selected</Text>
            <Text style={styles.bottomPlatforms}>
              {new Set(posts.filter((p) => p.selected).map((p) => p.platform)).size} platforms
            </Text>
          </View>
          <TouchableOpacity style={styles.scheduleBtn} onPress={handleSchedule} activeOpacity={0.8}>
            <Ionicons name="calendar" size={18} color={colors.text} />
            <Text style={styles.scheduleBtnText}>Schedule All</Text>
          </TouchableOpacity>
        </View>
      )}
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
    paddingBottom: 140,
  },
  header: {
    marginBottom: 16,
  },
  batchBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success + '15',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    gap: 4,
    marginBottom: 10,
  },
  batchBadgeText: {
    color: colors.success,
    fontSize: 12,
    fontWeight: '700',
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
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
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
    fontSize: 20,
    fontWeight: '700',
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: 10,
    marginTop: 4,
  },
  filterScroll: {
    marginBottom: 12,
    marginHorizontal: -4,
  },
  filterChip: {
    backgroundColor: colors.cardBg,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterActive: {
    backgroundColor: colors.primary + '20',
    borderColor: colors.primary,
  },
  filterText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
  filterActiveText: {
    color: colors.primaryLight,
  },
  selectAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
    alignSelf: 'flex-end',
  },
  selectAllText: {
    color: colors.primaryLight,
    fontSize: 12,
    fontWeight: '600',
  },
  dayHeader: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 8,
  },
  postCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  postSelected: {
    borderColor: colors.primary + '50',
    backgroundColor: colors.primary + '08',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.textMuted,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  postEmoji: {
    fontSize: 20,
    marginRight: 10,
  },
  postInfo: {
    flex: 1,
  },
  postTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  postMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 3,
  },
  postPersona: {
    color: colors.textMuted,
    fontSize: 11,
    marginRight: 4,
  },
  postPlatform: {
    fontSize: 11,
    fontWeight: '500',
  },
  postTime: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 80,
    left: 16,
    right: 16,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary + '30',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  bottomInfo: {
    flex: 1,
  },
  bottomCount: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  bottomPlatforms: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  scheduleBtn: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },
  scheduleBtnText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
});
