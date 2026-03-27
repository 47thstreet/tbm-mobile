import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface ScoreBreakdown {
  category: string;
  score: number;
  maxScore: number;
  feedback: string;
  icon: string;
}

const scorePost = (text: string): { total: number; breakdown: ScoreBreakdown[] } => {
  const hasEmoji = /[\u{1F600}-\u{1F9FF}]/u.test(text);
  const hasHashtag = text.includes('#');
  const hasCTA = /\b(link|swipe|tap|click|grab|book|reserve|dm|comment|share|tag)\b/i.test(text);
  const hasUrgency = /\b(tonight|now|today|limited|last|hurry|don't miss|only)\b/i.test(text);
  const wordCount = text.trim().split(/\s+/).length;
  const isOptimalLength = wordCount >= 15 && wordCount <= 50;

  const breakdown: ScoreBreakdown[] = [
    {
      category: 'Hook Strength',
      score: text.length > 0 ? (text.charAt(0) === text.charAt(0).toUpperCase() ? 18 : 12) : 0,
      maxScore: 20,
      feedback: text.length > 0 ? 'Opens strong with a clear hook' : 'Add an attention-grabbing opening line',
      icon: 'flash',
    },
    {
      category: 'Engagement Triggers',
      score: (hasEmoji ? 5 : 0) + (hasHashtag ? 5 : 0) + (hasCTA ? 8 : 0),
      maxScore: 20,
      feedback: hasCTA ? 'Has a clear call-to-action' : 'Add a CTA (swipe, tap, comment, etc.)',
      icon: 'heart',
    },
    {
      category: 'Urgency & FOMO',
      score: hasUrgency ? 18 : 6,
      maxScore: 20,
      feedback: hasUrgency ? 'Creates urgency effectively' : 'Add time-sensitive language',
      icon: 'time',
    },
    {
      category: 'Length & Format',
      score: isOptimalLength ? 20 : wordCount < 5 ? 4 : 12,
      maxScore: 20,
      feedback: isOptimalLength ? 'Optimal length for engagement' : wordCount < 15 ? 'Too short — add more context' : 'Consider trimming for better readability',
      icon: 'text',
    },
    {
      category: 'Brand Voice',
      score: text.length > 20 ? 16 : text.length > 0 ? 8 : 0,
      maxScore: 20,
      feedback: text.length > 20 ? 'Consistent with nightlife brand tone' : 'Develop the message further',
      icon: 'megaphone',
    },
  ];

  const total = breakdown.reduce((sum, b) => sum + b.score, 0);
  return { total, breakdown };
};

const getScoreColor = (score: number): string => {
  if (score >= 80) return colors.success;
  if (score >= 60) return colors.accent;
  if (score >= 40) return colors.warning;
  return colors.error;
};

const getScoreLabel = (score: number): string => {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Needs Work';
  return 'Weak';
};

export const ContentScoringScreen: React.FC = () => {
  const [content, setContent] = useState('');
  const [result, setResult] = useState<{ total: number; breakdown: ScoreBreakdown[] } | null>(null);

  const handleScore = () => {
    if (!content.trim()) return;
    setResult(scorePost(content));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View style={styles.scoreBadge}>
            <Ionicons name="analytics" size={16} color={colors.secondary} />
            <Text style={styles.scoreBadgeText}>Content Score</Text>
          </View>
          <Text style={styles.title}>Score Preview</Text>
          <Text style={styles.subtitle}>Check how your content will perform before posting</Text>
        </View>

        <Text style={styles.label}>Paste or type your content</Text>
        <TextInput
          style={styles.input}
          placeholder="Paste your caption, tweet, or post here..."
          placeholderTextColor={colors.textMuted}
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
        />
        <Text style={styles.charCount}>{content.trim().split(/\s+/).filter(Boolean).length} words</Text>

        <TouchableOpacity
          style={[styles.scoreBtn, !content.trim() && styles.scoreBtnDisabled]}
          onPress={handleScore}
          disabled={!content.trim()}
          activeOpacity={0.8}
        >
          <Ionicons name="analytics" size={18} color={colors.text} />
          <Text style={styles.scoreBtnText}>Score Content</Text>
        </TouchableOpacity>

        {result && (
          <View style={styles.resultSection}>
            <View style={styles.totalScoreCard}>
              <View style={[styles.scoreCircle, { borderColor: getScoreColor(result.total) }]}>
                <Text style={[styles.scoreNumber, { color: getScoreColor(result.total) }]}>
                  {result.total}
                </Text>
                <Text style={styles.scoreMax}>/100</Text>
              </View>
              <Text style={[styles.scoreLabel, { color: getScoreColor(result.total) }]}>
                {getScoreLabel(result.total)}
              </Text>
              <Text style={styles.scoreSummary}>
                {result.total >= 80
                  ? 'This content is ready to publish!'
                  : result.total >= 60
                  ? 'Solid content with room for improvement.'
                  : 'Review the suggestions below to boost performance.'}
              </Text>
            </View>

            <Text style={styles.breakdownTitle}>Score Breakdown</Text>
            {result.breakdown.map((item, idx) => (
              <View key={idx} style={styles.breakdownCard}>
                <View style={styles.breakdownHeader}>
                  <View style={styles.breakdownLeft}>
                    <Ionicons name={item.icon as any} size={16} color={colors.primaryLight} />
                    <Text style={styles.breakdownCategory}>{item.category}</Text>
                  </View>
                  <Text style={[styles.breakdownScore, { color: getScoreColor((item.score / item.maxScore) * 100) }]}>
                    {item.score}/{item.maxScore}
                  </Text>
                </View>
                <View style={styles.progressBg}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${(item.score / item.maxScore) * 100}%`,
                        backgroundColor: getScoreColor((item.score / item.maxScore) * 100),
                      },
                    ]}
                  />
                </View>
                <Text style={styles.breakdownFeedback}>{item.feedback}</Text>
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
  scoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary + '15',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    gap: 4,
    marginBottom: 10,
  },
  scoreBadgeText: {
    color: colors.secondary,
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
  },
  input: {
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
  scoreBtn: {
    backgroundColor: colors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 20,
    gap: 8,
  },
  scoreBtnDisabled: {
    opacity: 0.5,
  },
  scoreBtnText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  resultSection: {
    marginTop: 24,
  },
  totalScoreCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },
  scoreCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  scoreNumber: {
    fontSize: 32,
    fontWeight: '800',
  },
  scoreMax: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: -4,
  },
  scoreLabel: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  scoreSummary: {
    color: colors.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
  breakdownTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  breakdownCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  breakdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  breakdownLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  breakdownCategory: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  breakdownScore: {
    fontSize: 14,
    fontWeight: '700',
  },
  progressBg: {
    height: 4,
    backgroundColor: colors.surfaceHighlight,
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: 4,
    borderRadius: 2,
  },
  breakdownFeedback: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 16,
  },
});
