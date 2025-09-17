import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

export type FeatureCardProps = {
  title: string;
  subtitle?: string;
  imageUri: string;
  width?: number;
  height?: number;
};

export function FeatureCard({
  title,
  subtitle,
  imageUri,
  width = 300,
  height = 180,
}: FeatureCardProps) {
  const radius = 18;
  return (
    <View style={[styles.container, { width, borderRadius: radius }]}>
      <Image
        source={{ uri: imageUri }}
        style={{ width: '100%', height }}
        contentFit="cover"
        transition={200}
      />

      {/* Gradiente para legibilidade do texto */}
      <LinearGradient
        colors={[
          'rgba(0,0,0,0.0)',
          'rgba(0,0,0,0.15)',
          'rgba(8,30,48,0.35)',
          'rgba(10,25,45,0.6)',
        ]}
        locations={[0, 0.5, 0.75, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[StyleSheet.absoluteFill, { borderRadius: radius }]}
      />

      {/* Sheen sutil amarelado no canto superior esquerdo */}
      <LinearGradient
        colors={['rgba(255,235,130,0.35)', 'rgba(255,255,255,0.0)']}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.8, y: 0.4 }}
        style={[StyleSheet.absoluteFill, { borderRadius: radius }]}
      />

      {/* Borda translúcida fria */}
      <View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFillObject,
          {
            borderRadius: radius,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: 'rgba(210,235,255,0.35)',
          },
        ]}
      />

      {/* Conteúdo */}
      <View style={styles.textArea}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: 'rgba(12,40,70,0.18)',
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
    marginRight: 14,
  },
  textArea: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: 14,
  },
  title: { color: '#fff', fontSize: 18, fontWeight: '700' },
  subtitle: { marginTop: 4, color: 'rgba(240,248,255,0.9)' },
});
