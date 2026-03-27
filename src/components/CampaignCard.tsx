import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { Campaign } from '../types';

interface Props {
  campaign: Campaign;
}

const statusColors: Record<string, string> = {
  active: colors.success,
  paused: colors.warning,
  completed: colors.textMuted,
  draft: colors.secondary,
};

export const CampaignCard: React.FC<Props> = ({ campaign }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.name}>{campaign.name}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusColors[campaign.status] + '20' }]}>
            <View style={[styles.statusDot, { backgroundColor: statusColors[campaign.status] }]} />
            <Text style={[styles.statusText, { color: statusColors[campaign.status] }]}>
              {campaign.status}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.channels}>
        {campaign.channels.map((ch) => (
          <View key={ch} style={styles.channelBadge}>
            <Text style={styles.channelText}>{ch}</Text>
          </View>
        ))}
      </View>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Ionicons name="people-outline" size={14} color={colors.textMuted} />
          <Text style={styles.statText}>{(campaign.reach / 1000).toFixed(1)}K reach</Text>
        </View>
        <View style={styles.stat}>
          <Ionicons name="heart-outline" size={14} color={colors.textMuted} />
          <Text style={styles.statText}>{campaign.engagement}% eng.</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    marginBottom: 10,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  channels: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  channelBadge: {
    backgroundColor: colors.surfaceHighlight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  channelText: {
    color: colors.textSecondary,
    fontSize: 11,
  },
  stats: {
    flexDirection: 'row',
    gap: 16,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    color: colors.textMuted,
    fontSize: 12,
  },
});
