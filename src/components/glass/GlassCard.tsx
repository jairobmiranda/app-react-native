import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React, { PropsWithChildren, useMemo } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  useColorScheme,
  View,
  type GestureResponderEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

export type GlassCardProps = PropsWithChildren<{
  intensity?: number; // blur intensity
  radius?: number; // border radius
  background?: string; // fallback background color (rgba)
  scheme?: 'light' | 'dark'; // override device color scheme
  padding?: number; // inner padding
  style?: StyleProp<ViewStyle>;
  onPress?: (e: GestureResponderEvent) => void; // optional tappable card
  accessible?: boolean;
  testID?: string;
}>;

export function GlassCard({
  children,
  intensity,
  radius = 16,
  background,
  scheme,
  padding = 16,
  style,
  onPress,
  accessible = true,
  testID,
}: GlassCardProps) {
  const deviceScheme = useColorScheme?.() ?? 'light';
  const mode = scheme ?? (deviceScheme === 'dark' ? 'dark' : 'light');

  const palette = useMemo(() => {
    if (mode === 'dark') {
      return {
        bg: background ?? 'rgba(10,14,20,0.24)',
        blur: intensity ?? 26,
        gradA: 'rgba(120,170,255,0.06)',
        gradB: 'rgba(255,235,130,0.04)',
        border: 'rgba(160,190,255,0.14)',
        topEdge: 'rgba(255,255,255,0.05)',
      } as const;
    }
    return {
      bg: background ?? 'rgba(255,255,255,0.72)',
      blur: intensity ?? 36,
      gradA: 'rgba(255,255,255,0.85)',
      gradB: 'rgba(255,245,170,0.08)',
      border: 'rgba(0,0,0,0.06)',
      topEdge: 'rgba(255,255,255,0.32)',
    } as const;
  }, [mode, intensity, background]);

  const Container: any = onPress ? Pressable : View; // dynamic wrapper

  return (
    <Container
      style={[
        styles.wrapper,
        {
          borderRadius: radius,
          backgroundColor: palette.bg,
        },
        style,
      ]}
      android_ripple={
        onPress
          ? { color: mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)' }
          : undefined
      }
      onPress={onPress}
      accessible={accessible}
      testID={testID}
    >
      {/* Frosted blur layer */}
      <BlurView
        tint={mode === 'dark' ? 'dark' : 'light'}
        intensity={palette.blur}
        style={[StyleSheet.absoluteFill, { borderRadius: radius }]}
      />

      {/* Soft diagonal gradient to add warmth and depth */}
      <LinearGradient
        colors={[palette.gradA, palette.gradB, 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[StyleSheet.absoluteFill, { borderRadius: radius }]}
      />

      {/* Top glossy edge for the 'liquid' feel */}
      <LinearGradient
        colors={[palette.topEdge, 'rgba(255,255,255,0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: Math.min(18, radius),
          borderTopLeftRadius: radius,
          borderTopRightRadius: radius,
        }}
      />

      {/* Thin cold border (subtle) */}
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

      {/* Inner content */}
      <View style={[styles.content, { padding }]}>{children}</View>

      {/* Platform shadows */}
      <View
        pointerEvents="none"
        style={Platform.select({
          ios: [styles.shadowIos, { borderRadius: radius }],
          android: [styles.shadowAndroid],
          default: [],
        })}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    marginVertical: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 8 },
        backgroundColor: 'transparent',
      },
      android: {
        elevation: 3,
        backgroundColor: 'transparent',
      },
      default: [],
    }),
  },
  content: {
    position: 'relative',
    zIndex: 2,
  },
  shadowIos: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -8,
    height: 32,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
  },
  shadowAndroid: {
    // android elevation handled on wrapper
  },
});

export default GlassCard;
