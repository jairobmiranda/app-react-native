import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import {
  GestureResponderEvent,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export type GlassFABProps = {
  icon?: keyof typeof Ionicons.glyphMap;
  label?: string;
  onPress: (e: GestureResponderEvent) => void;
  bottom?: number; // distância do fundo
  right?: number; // distância da direita
  scheme?: 'light' | 'dark';
};

export function GlassFAB({
  icon = 'add',
  label,
  onPress,
  bottom = 28,
  right = 20,
  scheme,
}: GlassFABProps) {
  const deviceScheme = useColorScheme?.() ?? 'light';
  const mode = scheme ?? (deviceScheme === 'dark' ? 'dark' : 'light');
  const isDark = mode === 'dark';
  // valor animado para mover o sheen (0 -> 1)
  const t = useSharedValue(0);
  useEffect(() => {
    t.value = withRepeat(
      withTiming(1, { duration: 2800, easing: Easing.inOut(Easing.quad) }),
      -1,
      true
    );
  }, [t]);
  // anel de brilho rotativo (borda apenas)
  const ringStyle = useAnimatedStyle(() => {
    const rotate = `${t.value * 360}deg`;
    return {
      transform: [{ rotate }],
      opacity: 0.35, // bem suave
    } as any;
  });

  return (
    <View style={[styles.container, { bottom, right }]}>
      <View style={styles.fabWrapper}>
        <BlurView
          intensity={26}
          tint={isDark ? 'dark' : 'light'}
          style={[StyleSheet.absoluteFill, { borderRadius: 999 }]}
        />
        {/* gradiente bem sutil para volume em light */}
        <LinearGradient
          colors={
            isDark
              ? ['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.04)', 'transparent']
              : ['rgba(255,255,255,0.65)', 'rgba(255,255,255,0.28)', 'transparent']
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[StyleSheet.absoluteFill, { borderRadius: 999 }]}
        />
        {/* anel de brilho animado, apenas na borda */}
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            { borderRadius: 999, overflow: 'hidden' },
            ringStyle,
          ]}
        >
          <View style={styles.ringBand}>
            <LinearGradient
              colors={[
                'rgba(255,255,255,0)',
                'rgba(255,255,255,0.75)',
                'rgba(255,255,255,0)',
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
          </View>
        </Animated.View>

        {/* máscara interna para ocultar o brilho no centro */}
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            left: 2,
            top: 2,
            right: 2,
            bottom: 2,
            borderRadius: 999,
            backgroundColor: isDark ? 'rgba(10,14,20,0.28)' : 'rgba(255,255,255,0.58)',
          }}
        />
        <Pressable
          style={styles.fab}
          onPress={onPress}
          android_ripple={{
            color: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
            borderless: true,
          }}
        >
          <Ionicons name={icon} size={24} color={isDark ? '#fff' : '#111'} />
          {label ? (
            <Text style={[styles.fabLabel, { color: isDark ? '#fff' : '#111' }]}>
              {label}
            </Text>
          ) : null}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    bottom: 28,
  },
  fabWrapper: {
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 8 },
      },
      android: { elevation: 4 },
      default: {},
    }),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'transparent',
  },
  fab: {
    minWidth: 56,
    height: 56,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  fabLabel: {
    color: '#111',
    fontWeight: '600',
  },
  ringBand: {
    position: 'absolute',
    left: '-25%',
    right: '-25%',
    top: '-25%',
    bottom: '-25%',
    transform: [{ rotate: '25deg' }],
  },
});
