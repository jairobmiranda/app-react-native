import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Platform, StyleSheet, Text, View, useColorScheme } from 'react-native';

export type GlassHeaderProps = {
  title: string;
  subtitle?: string;
};

export function GlassHeader({ title, subtitle }: GlassHeaderProps) {
  const scheme = useColorScheme?.() ?? 'light';
  const isDark = scheme === 'dark';
  return (
    <View style={styles.container}>
      <View style={styles.glass}>
        <BlurView
          intensity={28}
          tint="default"
          style={[StyleSheet.absoluteFill, { borderRadius: 20 }]}
        />
        <LinearGradient
          colors={['rgba(170,210,255,0.32)', 'rgba(255,245,170,0.08)', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[StyleSheet.absoluteFill, { borderRadius: 20 }]}
        />
        <View style={styles.content}>
          <Text style={[styles.title, { color: isDark ? '#fff' : '#111' }]}>{title}</Text>
          {subtitle ? (
            <Text
              style={[
                styles.subtitle,
                { color: isDark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.65)' },
              ]}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  glass: {
    overflow: 'hidden',
    borderRadius: 20,
    backgroundColor: 'rgba(10,30,50,0.16)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 8 },
      },
      android: { elevation: 4 },
      default: {},
    }),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(190,220,255,0.28)',
  },
  content: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  subtitle: {
    marginTop: 4,
    color: 'rgba(255,255,255,0.85)',
  },
});
