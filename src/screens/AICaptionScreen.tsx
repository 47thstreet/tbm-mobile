import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const toneOptions = ['Hype', 'Elegant', 'Casual', 'Mysterious', 'FOMO', 'Luxury'];
const platformOptions = [
  { id: 'instagram', name: 'Instagram', icon: 'logo-instagram', color: colors.instagram },
  { id: 'tiktok', name: 'TikTok', icon: 'logo-tiktok', color: colors.tiktok },
  { id: 'twitter', name: 'Twitter', icon: 'logo-twitter', color: colors.twitter },
  { id: 'facebook', name: 'Facebook', icon: 'logo-facebook', color: colors.facebook },
];

const sampleCaptions: Record<string, string[]> = {
  Hype: [
    "Friday nights hit DIFFERENT at The Blueprint. You're not ready for what's coming this weekend. Doors open at 10. Don't sleep on it.",
    "The energy is UNMATCHED. DJ Nova on the decks, VIP bottles flowing, and the crowd is going OFF. This is what Friday nights were made for.",
    "If you weren't here last night, we feel sorry for you. Next weekend? Don't make the same mistake twice.",
  ],
  Elegant: [
    "An evening of refined indulgence awaits. Reserve your private table and experience nightlife elevated to an art form.",
    "Where sophistication meets celebration. The Blueprint -- curated experiences for those with discerning taste.",
    "Tonight's guest list reads like a who's who. Secure your place among the city's finest.",
  ],
  Casual: [
    "Good vibes, great drinks, even better company. See you tonight?",
    "No dress code. No pretense. Just a really good time with your favorite people. Pull up!",
    "That mid-week energy when you just need a night out. We got you. Open tonight 'til late.",
  ],
  Mysterious: [
    "Something is happening this Friday. That's all we can say... for now.",
    "Behind the velvet rope, secrets are kept and memories are made. Are you on the list?",
    "The city whispers about what happens after midnight at The Blueprint. Come find out.",
  ],
  FOMO: [
    "Last Friday sold out in 2 hours. This Friday? Tickets are already 60% gone. Just saying...",
    "Your friends are going. Your ex is going. Everyone is going. The real question -- are YOU?",
    "427 people on the waitlist last weekend. Don't be 428. Grab your spot NOW.",
  ],
  Luxury: [
    "Moet on ice. Skyline views. Your own private section. This is VIP done right.",
    "For those who expect nothing less than extraordinary. Premium bottle service starts at the door.",
    "Gold-rimmed glasses, premium pours, and a view that money can't buy. Almost.",
  ],
};

export const AICaptionScreen: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [selectedTone, setSelectedTone] = useState('Hype');
  const [selectedPlatform, setSelectedPlatform] = useState('instagram');
  const [generating, setGenerating] = useState(false);
  const [captions, setCaptions] = useState<string[]>([]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    setGenerating(true);
    setCaptions([]);
    setTimeout(() => {
      setCaptions(sampleCaptions[selectedTone] || sampleCaptions['Hype']);
      setGenerating(false);
    }, 1500);
  };

  const handleCopy = (idx: number) => {
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View style={styles.aiBadge}>
            <Ionicons name="sparkles" size={16} color={colors.accent} />
            <Text style={styles.aiBadgeText}>AI Powered</Text>
          </View>
          <Text style={styles.title}>Caption Generator</Text>
          <Text style={styles.subtitle}>Generate on-brand captions in seconds</Text>
        </View>

        <Text style={styles.label}>What's the post about?</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Friday night event, VIP table promo, DJ announcement..."
          placeholderTextColor={colors.textMuted}
          value={topic}
          onChangeText={setTopic}
          multiline
          textAlignVertical="top"
        />

        <Text style={styles.label}>Tone</Text>
        <View style={styles.chipGrid}>
          {toneOptions.map((tone) => (
            <TouchableOpacity
              key={tone}
              style={[styles.chip, selectedTone === tone && styles.chipActive]}
              onPress={() => setSelectedTone(tone)}
            >
              <Text style={[styles.chipText, selectedTone === tone && styles.chipTextActive]}>
                {tone}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Platform</Text>
        <View style={styles.platformRow}>
          {platformOptions.map((p) => (
            <TouchableOpacity
              key={p.id}
              style={[
                styles.platformChip,
                selectedPlatform === p.id && { borderColor: p.color, backgroundColor: p.color + '15' },
              ]}
              onPress={() => setSelectedPlatform(p.id)}
            >
              <Ionicons
                name={p.icon as any}
                size={18}
                color={selectedPlatform === p.id ? p.color : colors.textMuted}
              />
              <Text style={[styles.platformText, selectedPlatform === p.id && { color: p.color }]}>
                {p.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.generateBtn, !topic.trim() && styles.generateDisabled]}
          onPress={handleGenerate}
          disabled={!topic.trim() || generating}
          activeOpacity={0.8}
        >
          {generating ? (
            <ActivityIndicator color={colors.text} size="small" />
          ) : (
            <>
              <Ionicons name="sparkles" size={18} color={colors.text} />
              <Text style={styles.generateText}>Generate Captions</Text>
            </>
          )}
        </TouchableOpacity>

        {captions.length > 0 && (
          <View style={styles.results}>
            <Text style={styles.resultsTitle}>Generated Captions</Text>
            {captions.map((caption, idx) => (
              <View key={idx} style={styles.captionCard}>
                <Text style={styles.captionNumber}>#{idx + 1}</Text>
                <Text style={styles.captionText}>{caption}</Text>
                <View style={styles.captionActions}>
                  <TouchableOpacity style={styles.actionBtn} onPress={() => handleCopy(idx)}>
                    <Ionicons
                      name={copiedIdx === idx ? 'checkmark' : 'copy-outline'}
                      size={16}
                      color={copiedIdx === idx ? colors.success : colors.textMuted}
                    />
                    <Text style={[styles.actionText, copiedIdx === idx && { color: colors.success }]}>
                      {copiedIdx === idx ? 'Copied' : 'Copy'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionBtn}>
                    <Ionicons name="send-outline" size={16} color={colors.primaryLight} />
                    <Text style={[styles.actionText, { color: colors.primaryLight }]}>Use in Post</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
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
  header: {
    marginBottom: 20,
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent + '15',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    gap: 4,
    marginBottom: 10,
  },
  aiBadgeText: {
    color: colors.accent,
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
  label: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
    marginTop: 16,
  },
  input: {
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    color: colors.text,
    fontSize: 15,
    minHeight: 80,
    lineHeight: 22,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: colors.cardBg,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.primary + '20',
    borderColor: colors.primary,
  },
  chipText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  chipTextActive: {
    color: colors.primaryLight,
  },
  platformRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  platformChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBg,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 6,
  },
  platformText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
  generateBtn: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 24,
    gap: 8,
  },
  generateDisabled: {
    opacity: 0.5,
  },
  generateText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  results: {
    marginTop: 24,
  },
  resultsTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  captionCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  captionNumber: {
    color: colors.primaryLight,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
  },
  captionText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 21,
  },
  captionActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
});
