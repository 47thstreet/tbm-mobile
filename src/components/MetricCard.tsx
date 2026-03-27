import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface Props {
  label: string;
  value: string;
  change: number;
  icon: string;
}

export const MetricCard: React.FC<Props> = ({ label, value, change, icon }) => {
  const isPositive = change >= 0;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons name={icon as any} size={20} color={colors.primaryLight} />
        <View style={[styles.changeBadge, { backgroundColor: isPositive ? '#10B98120' : '#EF444420' }]}>
          <Ionicons
            name={isPositive ? 'arrow-up' : 'arrow-down'}
            size={12}
            color={isPositive ? colors.success : colors.error}
          />
          <Text style={[styles.changeText, { color: isPositive ? colors.success : colors.error }]}>
            {Math.abs(change)}%
          </Text>
        </View>
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 16,
    width: '48%',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  changeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  changeText: {
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 2,
  },
  value: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  label: {
    color: colors.textMuted,
    fontSize: 12,
  },
});
