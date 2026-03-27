import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { MetricCard } from '../components/MetricCard';
import { CampaignCard } from '../components/CampaignCard';
import { Campaign } from '../types';

const metrics = [
  { label: 'Total Reach', value: '142K', change: 12.5, icon: 'people-outline' },
  { label: 'Engagement', value: '8.4%', change: 3.2, icon: 'heart-outline' },
  { label: 'Active Campaigns', value: '6', change: 0, icon: 'megaphone-outline' },
  { label: 'Posts This Week', value: '34', change: -2.1, icon: 'document-text-outline' },
];

const campaigns: Campaign[] = [
  {
    id: '1',
    name: 'Weekend Nightlife Push',
    status: 'active',
    channels: ['Instagram', 'TikTok', 'WhatsApp'],
    reach: 45200,
    engagement: 9.2,
    startDate: '2026-03-20',
  },
  {
    id: '2',
    name: 'VIP Table Promos',
    status: 'active',
    channels: ['Instagram', 'Facebook'],
    reach: 28100,
    engagement: 7.8,
    startDate: '2026-03-18',
  },
  {
    id: '3',
    name: 'Spring Break Series',
    status: 'draft',
    channels: ['TikTok', 'Instagram', 'Twitter'],
    reach: 0,
    engagement: 0,
    startDate: '2026-04-01',
  },
  {
    id: '4',
    name: 'Ladies Night Q1 Wrap',
    status: 'completed',
    channels: ['WhatsApp', 'Instagram'],
    reach: 67800,
    engagement: 11.3,
    startDate: '2026-01-15',
    endDate: '2026-03-15',
  },
];

export const DashboardScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.greeting}>TBM Marketing</Text>
          <Text style={styles.subtitle}>Campaign Overview</Text>
        </View>

        <View style={styles.metricsGrid}>
          {metrics.map((m) => (
            <MetricCard key={m.label} {...m} />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Active Campaigns</Text>
        {campaigns
          .filter((c) => c.status === 'active')
          .map((c) => (
            <CampaignCard key={c.id} campaign={c} />
          ))}

        <Text style={styles.sectionTitle}>All Campaigns</Text>
        {campaigns.map((c) => (
          <CampaignCard key={c.id} campaign={c} />
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
    marginBottom: 20,
  },
  greeting: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 4,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 12,
  },
});
