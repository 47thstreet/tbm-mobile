import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface ToolItem {
  name: string;
  screen: string;
  icon: string;
  color: string;
  description: string;
  badge?: string;
}

const tools: ToolItem[] = [
  {
    name: 'AI Caption Generator',
    screen: 'AICaption',
    icon: 'sparkles',
    color: colors.accent,
    description: 'Generate on-brand captions with AI for any persona and platform',
    badge: 'AI',
  },
  {
    name: 'Content Score Preview',
    screen: 'ContentScoring',
    icon: 'analytics',
    color: colors.secondary,
    description: 'Score your content before posting — get engagement predictions',
    badge: 'New',
  },
  {
    name: 'Batch Scheduling',
    screen: 'BatchSchedule',
    icon: 'layers',
    color: colors.success,
    description: 'Select and schedule multiple posts across personas at once',
  },
  {
    name: 'Personas',
    screen: 'PersonasTab',
    icon: 'people',
    color: colors.primaryLight,
    description: 'Manage 6 social personas and view their content queues',
  },
  {
    name: 'Notifications',
    screen: 'NotificationsTab',
    icon: 'notifications',
    color: colors.error,
    description: 'Real-time alerts for campaigns, engagement spikes, and broadcasts',
  },
];

export const MoreScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Tools</Text>
        <Text style={styles.subtitle}>Marketing tools and features</Text>

        {tools.map((tool) => (
          <TouchableOpacity
            key={tool.screen}
            style={styles.toolCard}
            onPress={() => navigation.navigate(tool.screen)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, { backgroundColor: tool.color + '15' }]}>
              <Ionicons name={tool.icon as any} size={24} color={tool.color} />
            </View>
            <View style={styles.toolInfo}>
              <View style={styles.toolHeader}>
                <Text style={styles.toolName}>{tool.name}</Text>
                {tool.badge && (
                  <View style={[styles.badge, { backgroundColor: tool.color + '20' }]}>
                    <Text style={[styles.badgeText, { color: tool.color }]}>{tool.badge}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.toolDesc}>{tool.description}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </TouchableOpacity>
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
    marginBottom: 20,
  },
  toolCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  toolInfo: {
    flex: 1,
    marginRight: 8,
  },
  toolHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  toolName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  toolDesc: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 4,
  },
});
