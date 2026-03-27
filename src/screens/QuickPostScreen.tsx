import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const personas = [
  { id: '1', name: 'DJ Vibe', emoji: '🎧', color: colors.primary },
  { id: '2', name: 'Party Girl', emoji: '💃', color: colors.tiktok },
  { id: '3', name: 'VIP Host', emoji: '🥂', color: colors.accent },
  { id: '4', name: 'Club Official', emoji: '🏛', color: colors.secondary },
  { id: '5', name: 'Nightlife Insider', emoji: '🌃', color: colors.instagram },
  { id: '6', name: 'Hype Man', emoji: '🔥', color: colors.error },
];

const platforms = [
  { id: 'instagram', name: 'Instagram', icon: 'logo-instagram', color: colors.instagram },
  { id: 'tiktok', name: 'TikTok', icon: 'logo-tiktok', color: colors.tiktok },
  { id: 'facebook', name: 'Facebook', icon: 'logo-facebook', color: colors.facebook },
  { id: 'twitter', name: 'Twitter', icon: 'logo-twitter', color: colors.twitter },
  { id: 'whatsapp', name: 'WhatsApp', icon: 'logo-whatsapp', color: colors.whatsapp },
];

export const QuickPostScreen: React.FC = () => {
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [content, setContent] = useState('');
  const [scheduleTime, setScheduleTime] = useState('Now');

  const handlePost = () => {
    if (!selectedPersona || !selectedPlatform || !content.trim()) {
      Alert.alert('Missing Info', 'Select a persona, platform, and write your content.');
      return;
    }
    const persona = personas.find((p) => p.id === selectedPersona);
    Alert.alert(
      'Post Scheduled',
      `"${content.substring(0, 50)}..." will be posted as ${persona?.name} on ${selectedPlatform}.`,
    );
    setContent('');
    setSelectedPersona(null);
    setSelectedPlatform(null);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Quick Post</Text>
        <Text style={styles.subtitle}>Create and schedule from your phone</Text>

        <Text style={styles.label}>Persona</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {personas.map((p) => (
            <TouchableOpacity
              key={p.id}
              style={[
                styles.personaChip,
                selectedPersona === p.id && { backgroundColor: p.color + '30', borderColor: p.color },
              ]}
              onPress={() => setSelectedPersona(p.id)}
            >
              <Text style={styles.personaEmoji}>{p.emoji}</Text>
              <Text style={[styles.personaName, selectedPersona === p.id && { color: p.color }]}>
                {p.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.label}>Platform</Text>
        <View style={styles.platformGrid}>
          {platforms.map((p) => (
            <TouchableOpacity
              key={p.id}
              style={[
                styles.platformChip,
                selectedPlatform === p.id && { backgroundColor: p.color + '20', borderColor: p.color },
              ]}
              onPress={() => setSelectedPlatform(p.id)}
            >
              <Ionicons
                name={p.icon as any}
                size={20}
                color={selectedPlatform === p.id ? p.color : colors.textMuted}
              />
              <Text style={[styles.platformName, selectedPlatform === p.id && { color: p.color }]}>
                {p.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Content</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Write your post..."
          placeholderTextColor={colors.textMuted}
          multiline
          value={content}
          onChangeText={setContent}
          textAlignVertical="top"
        />
        <Text style={styles.charCount}>{content.length} / 2200</Text>

        <Text style={styles.label}>Schedule</Text>
        <View style={styles.scheduleRow}>
          {['Now', 'In 1 Hour', 'Tonight 8PM', 'Tomorrow'].map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.scheduleChip, scheduleTime === t && styles.scheduleActive]}
              onPress={() => setScheduleTime(t)}
            >
              <Text style={[styles.scheduleText, scheduleTime === t && styles.scheduleActiveText]}>
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.postButton} onPress={handlePost} activeOpacity={0.8}>
          <Ionicons name="send" size={18} color={colors.text} />
          <Text style={styles.postButtonText}>
            {scheduleTime === 'Now' ? 'Post Now' : 'Schedule Post'}
          </Text>
        </TouchableOpacity>
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
    marginBottom: 20,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
    marginTop: 16,
  },
  horizontalScroll: {
    marginHorizontal: -4,
  },
  personaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBg,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  personaEmoji: {
    fontSize: 18,
    marginRight: 6,
  },
  personaName: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  platformGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  platformChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBg,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 6,
  },
  platformName: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
  textInput: {
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    color: colors.text,
    fontSize: 15,
    minHeight: 120,
    lineHeight: 22,
  },
  charCount: {
    color: colors.textMuted,
    fontSize: 12,
    textAlign: 'right',
    marginTop: 4,
  },
  scheduleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  scheduleChip: {
    backgroundColor: colors.cardBg,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  scheduleActive: {
    backgroundColor: colors.primary + '20',
    borderColor: colors.primary,
  },
  scheduleText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
  scheduleActiveText: {
    color: colors.primaryLight,
  },
  postButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 24,
    gap: 8,
  },
  postButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
});
