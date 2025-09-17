import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React, { PropsWithChildren } from 'react';
import { Platform, StyleSheet, Text, View, useColorScheme } from 'react-native';

export type GlassListItemProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}>;

export function GlassListItem({ title, subtitle, right, children }: GlassListItemProps) {
  const scheme = useColorScheme?.() ?? 'light';
  const isDark = scheme === 'dark';
  return (
    <View style={styles.wrapper}>
      <BlurView
        intensity={20}
        tint="default"
        style={[StyleSheet.absoluteFill, { borderRadius: 14 }]}
      />
      <LinearGradient
        colors={['rgba(170,210,255,0.25)', 'rgba(255,245,170,0.06)', 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[StyleSheet.absoluteFill, { borderRadius: 14 }]}
      />
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.title, { color: isDark ? '#fff' : '#111' }]}>{title}</Text>
          {subtitle ? (
            <Text
              style={[
                styles.subtitle,
                { color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.6)' },
              ]}
            >
              {subtitle}
            </Text>
          ) : null}
          {children}
        </View>
        {right}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    backgroundColor: 'rgba(10,30,50,0.14)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
      },
      android: { elevation: 3 },
      default: {},
    }),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(190,220,255,0.22)',
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  title: { color: '#fff', fontWeight: '600' },
  subtitle: { color: 'rgba(255,255,255,0.8)', marginTop: 4 },
});
