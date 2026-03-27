import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const timeRanges = ['7D', '30D', '90D'];

interface PlatformStat {
  name: string;
  icon: string;
  color: string;
  followers: string;
  engagement: string;
  reach: string;
  posts: number;
  growth: number;
}

const platformStats: PlatformStat[] = [
  { name: 'Instagram', icon: 'logo-instagram', color: colors.instagram, followers: '24.5K', engagement: '8.7%', reach: '89K', posts: 42, growth: 5.2 },
  { name: 'TikTok', icon: 'logo-tiktok', color: colors.tiktok, followers: '18.2K', engagement: '12.4%', reach: '156K', posts: 28, growth: 14.8 },
  { name: 'Facebook', icon: 'logo-facebook', color: colors.facebook, followers: '31.0K', engagement: '3.2%', reach: '45K', posts: 18, growth: 1.1 },
  { name: 'Twitter', icon: 'logo-twitter', color: colors.twitter, followers: '8.9K', engagement: '4.1%', reach: '22K', posts: 56, growth: 2.7 },
  { name: 'WhatsApp', icon: 'logo-whatsapp', color: colors.whatsapp, followers: '5.2K', engagement: '67%', reach: '5.2K', posts: 12, growth: 8.3 },
];

const topContent = [
  { title: 'Friday Night Reel', platform: 'TikTok', views: '45.2K', engagement: '18.4%', color: colors.tiktok },
  { title: 'VIP Table Tour', platform: 'Instagram', views: '12.8K', engagement: '11.2%', color: colors.instagram },
  { title: 'DJ Set Announcement', platform: 'Instagram', views: '9.4K', engagement: '9.8%', color: colors.instagram },
  { title: 'Weekend Recap Thread', platform: 'Twitter', views: '6.1K', engagement: '5.3%', color: colors.twitter },
];

export const AnalyticsScreen: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState('30D');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Analytics</Text>
        <Text style={styles.subtitle}>Cross-platform metrics</Text>

        <View style={styles.rangeRow}>
          {timeRanges.map((r) => (
            <TouchableOpacity
              key={r}
              style={[styles.rangeChip, selectedRange === r && styles.rangeActive]}
              onPress={() => setSelectedRange(r)}
            >
              <Text style={[styles.rangeText, selectedRange === r && styles.rangeActiveText]}>{r}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.overviewCard}>
          <View style={styles.overviewRow}>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewValue}>87.8K</Text>
              <Text style={styles.overviewLabel}>Total Followers</Text>
            </View>
            <View style={styles.overviewDivider} />
            <View style={styles.overviewItem}>
              <Text style={styles.overviewValue}>317K</Text>
              <Text style={styles.overviewLabel}>Total Reach</Text>
            </View>
            <View style={styles.overviewDivider} />
            <View style={styles.overviewItem}>
              <Text style={styles.overviewValue}>156</Text>
              <Text style={styles.overviewLabel}>Posts</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>By Platform</Text>
        {platformStats.map((p) => (
          <View key={p.name} style={styles.platformCard}>
            <View style={styles.platformHeader}>
              <View style={styles.platformName}>
                <Ionicons name={p.icon as any} size={20} color={p.color} />
                <Text style={styles.platformNameText}>{p.name}</Text>
              </View>
              <View style={[styles.growthBadge, { backgroundColor: colors.success + '20' }]}>
                <Ionicons name="trending-up" size={12} color={colors.success} />
                <Text style={styles.growthText}>+{p.growth}%</Text>
              </View>
            </View>
            <View style={styles.platformStats}>
              <View style={styles.platformStat}>
                <Text style={styles.platformStatValue}>{p.followers}</Text>
                <Text style={styles.platformStatLabel}>Followers</Text>
              </View>
              <View style={styles.platformStat}>
                <Text style={styles.platformStatValue}>{p.engagement}</Text>
                <Text style={styles.platformStatLabel}>Engagement</Text>
              </View>
              <View style={styles.platformStat}>
                <Text style={styles.platformStatValue}>{p.reach}</Text>
                <Text style={styles.platformStatLabel}>Reach</Text>
              </View>
              <View style={styles.platformStat}>
                <Text style={styles.platformStatValue}>{p.posts}</Text>
                <Text style={styles.platformStatLabel}>Posts</Text>
              </View>
            </View>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Top Performing Content</Text>
        {topContent.map((c, idx) => (
          <View key={idx} style={styles.contentCard}>
            <View style={styles.contentRank}>
              <Text style={styles.rankText}>{idx + 1}</Text>
            </View>
            <View style={styles.contentInfo}>
              <Text style={styles.contentTitle}>{c.title}</Text>
              <Text style={[styles.contentPlatform, { color: c.color }]}>{c.platform}</Text>
            </View>
            <View style={styles.contentStats}>
              <Text style={styles.contentViews}>{c.views}</Text>
              <Text style={styles.contentEng}>{c.engagement}</Text>
            </View>
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
  rangeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  rangeChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.cardBg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  rangeActive: {
    backgroundColor: colors.primary + '20',
    borderColor: colors.primary,
  },
  rangeText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  rangeActiveText: {
    color: colors.primaryLight,
  },
  overviewCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },
  overviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overviewItem: {
    flex: 1,
    alignItems: 'center',
  },
  overviewDivider: {
    width: 1,
    height: 32,
    backgroundColor: colors.border,
  },
  overviewValue: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
  },
  overviewLabel: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 4,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 4,
  },
  platformCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  platformHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  platformName: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  platformNameText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
  growthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 3,
  },
  growthText: {
    color: colors.success,
    fontSize: 12,
    fontWeight: '600',
  },
  platformStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  platformStat: {
    alignItems: 'center',
  },
  platformStatValue: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
  platformStatLabel: {
    color: colors.textMuted,
    fontSize: 10,
    marginTop: 2,
  },
  contentCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentRank: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surfaceHighlight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '700',
  },
  contentInfo: {
    flex: 1,
  },
  contentTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  contentPlatform: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  contentStats: {
    alignItems: 'flex-end',
  },
  contentViews: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  contentEng: {
    color: colors.success,
    fontSize: 12,
    marginTop: 2,
  },
});
