import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React, { PropsWithChildren } from 'react';
import { Platform, StyleSheet, useColorScheme, View, ViewStyle } from 'react-native';

export type GlassCardProps = PropsWithChildren<{
  intensity?: number;
  radius?: number;
  background?: string; // override
  scheme?: 'light' | 'dark';
  padding?: number;
  style?: ViewStyle;
}>;

export function GlassCard({
  children,
  intensity,
  radius = 16,
  background,
  scheme,
  padding = 16,
  style,
}: GlassCardProps) {
  const deviceScheme = useColorScheme?.() ?? 'light';
  const mode = scheme ?? deviceScheme;

  const palette =
    mode === 'dark'
      ? {
          bg: background ?? 'rgba(10,30,50,0.16)',
          blur: intensity ?? 28,
          gradA: 'rgba(170,210,255,0.35)',
          gradB: 'rgba(255,245,170,0.10)',
          border: 'rgba(190,220,255,0.28)',
          topEdge: 'rgba(255,255,255,0.08)',
        }
      : {
          bg: background ?? 'rgba(255,255,255,0.55)',
          blur: intensity ?? 35,
          gradA: 'rgba(255,255,255,0.65)',
          gradB: 'rgba(255,245,170,0.15)',
          border: 'rgba(160,190,220,0.55)',
          topEdge: 'rgba(255,255,255,0.35)',
        };

  return (
    <View
      style={[
        styles.wrapper,
        { borderRadius: radius, backgroundColor: palette.bg },
        style,
      ]}
    >
      <BlurView
        tint="default"
        intensity={palette.blur}
        style={[StyleSheet.absoluteFill, { borderRadius: radius }]}
      />
      <LinearGradient
        colors={[palette.gradA, palette.gradB, 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[StyleSheet.absoluteFill, { borderRadius: radius }]}
      />
      <LinearGradient
        colors={[palette.topEdge, 'rgba(255,255,255,0.0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: 14,
          borderTopLeftRadius: radius,
          borderTopRightRadius: radius,
        }}
      />
      <View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFillObject,
          {
            borderRadius: radius,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: palette.border,
          },
        ]}
      />
      <View style={[styles.content, { padding }]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.18,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 8 },
      },
      android: {
        elevation: 6,
      },
      default: {},
    }),
  },
  content: {},
});
