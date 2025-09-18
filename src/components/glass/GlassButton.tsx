import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  GestureResponderEvent,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

export type GlassButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  radius?: number;
  intensity?: number;
  style?: any;
  scheme?: 'light' | 'dark';
};

export function GlassButton({
  title,
  onPress,
  radius = 14,
  intensity = 28,
  style,
  scheme,
}: GlassButtonProps) {
  const deviceScheme = useColorScheme?.() ?? 'light';
  const mode = scheme ?? (deviceScheme === 'dark' ? 'dark' : 'light');
  const isDark = mode === 'dark';
  // animação de brilho sutil percorrendo a borda
  const t = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(t, {
        toValue: 1,
        duration: 4200,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [t]);

  const rotate = t.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <View style={[styles.wrapper, { borderRadius: radius }, style]}>
      {/* Plano de fundo translúcido e blur para efeito glass light */}
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            borderRadius: radius,
            backgroundColor: isDark ? 'rgba(10,14,20,0.28)' : 'rgba(255,255,255,0.64)',
          },
        ]}
      />
      <BlurView
        tint={isDark ? 'dark' : 'light'}
        intensity={intensity}
        style={[StyleSheet.absoluteFill, { borderRadius: radius }]}
      />

      {/* Borda estática muito sutil */}
      <View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFillObject,
          {
            borderRadius: radius,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: isDark ? 'rgba(160,190,255,0.14)' : 'rgba(0,0,0,0.06)',
          },
        ]}
      />

      {/* Anel de brilho animado apenas na borda */}
      <Animated.View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFill,
          {
            borderRadius: radius,
            overflow: 'hidden',
            transform: [{ rotate }],
          },
        ]}
      >
        {/* faixa diagonal que cruza as bordas; só ficará visível na borda pois cobrimos o miolo */}
        <View style={styles.shimmerContainer}>
          <LinearGradient
            colors={
              isDark
                ? ['rgba(255,255,255,0)', 'rgba(255,255,255,0.55)', 'rgba(255,255,255,0)']
                : ['rgba(255,255,255,0)', 'rgba(255,255,255,0.65)', 'rgba(255,255,255,0)']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        </View>
      </Animated.View>

      {/* Máscara interna para ocultar o brilho no centro do botão, mantendo o efeito na borda */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          left: 2,
          top: 2,
          right: 2,
          bottom: 2,
          borderRadius: Math.max(0, radius - 2),
          backgroundColor: isDark ? 'rgba(10,14,20,0.28)' : 'rgba(255,255,255,0.64)',
        }}
      />

      {/* Gradiente suave para dar volume, estilo Apple light */}
      <LinearGradient
        colors={
          isDark
            ? ['rgba(255,255,255,0.06)', 'rgba(255,255,255,0.02)', 'transparent']
            : [
                'rgba(255,255,255,0.75)',
                'rgba(255,255,255,0.45)',
                'rgba(255,255,255,0.25)',
              ]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[StyleSheet.absoluteFill, { borderRadius: radius }]}
      />

      <TouchableOpacity
        style={[styles.touch, { borderRadius: radius }]}
        onPress={onPress}
        activeOpacity={0.85}
      >
        <Text style={[styles.text, { color: isDark ? '#F8FBFF' : '#0B0B0B' }]}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
      },
      android: { elevation: 2 },
      default: {},
    }),
    borderWidth: 0,
  },
  touch: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#0B0B0B',
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  shimmerContainer: {
    position: 'absolute',
    left: '-25%',
    right: '-25%',
    top: '-25%',
    bottom: '-25%',
    transform: [{ rotate: '25deg' }],
  },
});
