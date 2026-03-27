import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { Persona } from '../types';

interface Props {
  persona: Persona;
  onPress?: () => void;
}

const platformIcons: Record<string, string> = {
  instagram: 'logo-instagram',
  tiktok: 'logo-tiktok',
  facebook: 'logo-facebook',
  twitter: 'logo-twitter',
  whatsapp: 'logo-whatsapp',
};

export const PersonaCard: React.FC<Props> = ({ persona, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.avatar, { backgroundColor: persona.color + '30' }]}>
        <Text style={[styles.avatarText, { color: persona.color }]}>{persona.avatar}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{persona.name}</Text>
        <View style={styles.handleRow}>
          <Ionicons
            name={platformIcons[persona.platform] as any}
            size={14}
            color={colors.textMuted}
          />
          <Text style={styles.handle}>@{persona.handle}</Text>
        </View>
      </View>
      <View style={styles.right}>
        <Text style={styles.followers}>{(persona.followers / 1000).toFixed(1)}K</Text>
        <View style={styles.queueBadge}>
          <Text style={styles.queueText}>{persona.queueCount} queued</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
  handleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  handle: {
    color: colors.textMuted,
    fontSize: 12,
  },
  right: {
    alignItems: 'flex-end',
  },
  followers: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  queueBadge: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 4,
  },
  queueText: {
    color: colors.primaryLight,
    fontSize: 10,
    fontWeight: '600',
  },
});
