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
};

export function GlassFAB({
  icon = 'add',
  label,
  onPress,
  bottom = 28,
  right = 20,
}: GlassFABProps) {
  // valor animado para mover o sheen (0 -> 1)
  const t = useSharedValue(0);
  useEffect(() => {
    t.value = withRepeat(
      withTiming(1, { duration: 2800, easing: Easing.inOut(Easing.quad) }),
      -1,
      true
    );
  }, [t]);

  const sheenStyle = useAnimatedStyle(() => {
    // translateX de -60% até 60% da largura do botão
    const translateX = (t.value - 0.5) * 140; // porcentagem simulada
    return {
      transform: [{ translateX }],
      opacity: 0.85 - Math.abs(t.value - 0.5),
    } as any;
  });

  return (
    <View style={[styles.container, { bottom, right }]}>
      <View style={styles.fabWrapper}>
        <BlurView
          intensity={30}
          tint="default"
          style={[StyleSheet.absoluteFill, { borderRadius: 999 }]}
        />
        {/* realce base azulado com toque amarelado para "água" */}
        <LinearGradient
          colors={['rgba(170,210,255,0.45)', 'rgba(255,250,200,0.12)', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[StyleSheet.absoluteFill, { borderRadius: 999 }]}
        />
        {/* faixa de brilho animada */}
        <Animated.View pointerEvents="none" style={[styles.sheen, sheenStyle]}>
          <LinearGradient
            colors={[
              'rgba(255,255,200,0.0)',
              'rgba(255,245,170,0.7)',
              'rgba(255,255,200,0.0)',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
        <Pressable
          style={styles.fab}
          onPress={onPress}
          android_ripple={{ color: 'rgba(255,255,255,0.2)', borderless: true }}
        >
          <Ionicons name={icon} size={24} color="#fff" />
          {label ? <Text style={styles.fabLabel}>{label}</Text> : null}
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
    backgroundColor: 'rgba(10,30,50,0.22)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 10 },
      },
      android: { elevation: 6 },
      default: {},
    }),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(190,220,255,0.35)',
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
    color: '#fff',
    fontWeight: '600',
  },
  sheen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 60,
    borderRadius: 999,
    // leve rotação para dar a sensação de "passada" diagonal
    transform: [{ rotate: '20deg' }],
  },
});
