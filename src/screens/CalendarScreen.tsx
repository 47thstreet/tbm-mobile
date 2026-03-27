import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

interface CalendarPost {
  day: number;
  persona: string;
  platform: string;
  color: string;
  time: string;
  title: string;
}

const scheduledPosts: CalendarPost[] = [
  { day: 27, persona: 'DJ Vibe', platform: 'Instagram', color: colors.instagram, time: '8:00 PM', title: 'Friday Night Teaser' },
  { day: 27, persona: 'Club Official', platform: 'WhatsApp', color: colors.whatsapp, time: '6:00 PM', title: 'Weekend Broadcast' },
  { day: 28, persona: 'Party Girl', platform: 'TikTok', color: colors.tiktok, time: '2:00 PM', title: 'Outfit GRWM' },
  { day: 28, persona: 'VIP Host', platform: 'Instagram', color: colors.instagram, time: '7:00 PM', title: 'Table Availability' },
  { day: 29, persona: 'DJ Vibe', platform: 'TikTok', color: colors.tiktok, time: '9:00 PM', title: 'Live Set Preview' },
  { day: 30, persona: 'Nightlife Insider', platform: 'Twitter', color: colors.twitter, time: '12:00 PM', title: 'Industry Take' },
  { day: 31, persona: 'Club Official', platform: 'Facebook', color: colors.facebook, time: '5:00 PM', title: 'Event Announcement' },
  { day: 1, persona: 'Party Girl', platform: 'Instagram', color: colors.instagram, time: '11:00 AM', title: 'Recap Carousel' },
  { day: 2, persona: 'VIP Host', platform: 'WhatsApp', color: colors.whatsapp, time: '4:00 PM', title: 'VIP List Reminder' },
];

export const CalendarScreen: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState(27);
  const year = 2026;
  const month = 2; // March (0-indexed)

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  const dayPosts = scheduledPosts.filter((p) => p.day === selectedDay);
  const daysWithPosts = new Set(scheduledPosts.map((p) => p.day));

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Content Calendar</Text>
        <Text style={styles.subtitle}>{MONTHS[month]} {year}</Text>

        <View style={styles.calendar}>
          <View style={styles.daysHeader}>
            {DAYS.map((d) => (
              <Text key={d} style={styles.dayLabel}>{d}</Text>
            ))}
          </View>
          <View style={styles.daysGrid}>
            {calendarDays.map((day, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.dayCell,
                  day === selectedDay && styles.selectedDay,
                ]}
                onPress={() => day && setSelectedDay(day)}
                disabled={!day}
              >
                {day ? (
                  <>
                    <Text style={[styles.dayText, day === selectedDay && styles.selectedDayText]}>
                      {day}
                    </Text>
                    {daysWithPosts.has(day) && (
                      <View style={[styles.dot, day === selectedDay && styles.dotSelected]} />
                    )}
                  </>
                ) : null}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          {MONTHS[month]} {selectedDay} — {dayPosts.length} post{dayPosts.length !== 1 ? 's' : ''}
        </Text>

        {dayPosts.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={40} color={colors.textMuted} />
            <Text style={styles.emptyText}>No posts scheduled</Text>
          </View>
        ) : (
          dayPosts.map((post, idx) => (
            <View key={idx} style={styles.postCard}>
              <View style={[styles.postIndicator, { backgroundColor: post.color }]} />
              <View style={styles.postInfo}>
                <Text style={styles.postTitle}>{post.title}</Text>
                <View style={styles.postMeta}>
                  <Text style={styles.postPersona}>{post.persona}</Text>
                  <Text style={styles.postDot}>  </Text>
                  <Text style={[styles.postPlatform, { color: post.color }]}>{post.platform}</Text>
                </View>
              </View>
              <Text style={styles.postTime}>{post.time}</Text>
            </View>
          ))
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
    color: colors.primaryLight,
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 16,
  },
  calendar: {
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },
  daysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  dayLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    width: 40,
    textAlign: 'center',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  selectedDay: {
    backgroundColor: colors.primary,
  },
  dayText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  selectedDayText: {
    color: colors.text,
    fontWeight: '700',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primaryLight,
    marginTop: 2,
  },
  dotSelected: {
    backgroundColor: colors.text,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 8,
  },
  postCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  postIndicator: {
    width: 4,
    height: 36,
    borderRadius: 2,
    marginRight: 12,
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
    marginTop: 3,
  },
  postPersona: {
    color: colors.textMuted,
    fontSize: 12,
  },
  postDot: {
    color: colors.textMuted,
    fontSize: 12,
  },
  postPlatform: {
    fontSize: 12,
    fontWeight: '600',
  },
  postTime: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
});
