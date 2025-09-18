import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useMemo, useRef } from 'react';
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';

export type FeatureCardProps = {
  title: string;
  subtitle?: string;
  imageUri: string;
  width?: number | string; // allow % or number
  height?: number;
  onPress?: () => void;
  style?: ViewStyle;
};

export default function FeatureCard({
  title,
  subtitle,
  imageUri,
  width = 300,
  height = 180,
  onPress,
  style,
}: FeatureCardProps) {
  const radius = 18;
  const scheme = useColorScheme();

  // Animated values for gentle parallax + sheen
  const scale = useRef(new Animated.Value(1)).current;
  const sheen = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(sheen, {
        toValue: 1,
        duration: 3500,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.quad),
      })
    );
    loop.start();
    return () => loop.stop();
  }, [sheen]);

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.985, useNativeDriver: true }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };

  const colors = useMemo(() => {
    // paleta priorizando light com texto escuro
    if (scheme === 'dark') {
      return {
        glassBg: 'rgba(10,14,20,0.28)',
        border: 'rgba(160,190,255,0.14)',
        title: '#F8FBFF',
        subtitle: 'rgba(240,248,255,0.85)',
        vignette: 'rgba(0,0,0,0.5)',
      } as const;
    }
    return {
      glassBg: 'rgba(255,255,255,0.56)',
      border: 'rgba(0,0,0,0.06)',
      title: '#111418',
      subtitle: 'rgba(17,20,24,0.65)',
      vignette: 'rgba(6,18,28,0.22)',
    } as const;
  }, [scheme]);

  // sheen translateX interpolation
  const sheenTranslate = sheen.interpolate({
    inputRange: [-1, 1],
    outputRange: [
      -1.2 * (typeof width === 'number' ? width : 300),
      1.2 * (typeof width === 'number' ? width : 300),
    ],
  });

  return (
    <Pressable
      accessibilityLabel={title}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={({ pressed }) => [{ opacity: pressed ? 0.98 : 1 }]}
    >
      <Animated.View
        style={[
          styles.container,
          {
            width:
              typeof width === 'number'
                ? width
                : typeof width === 'string' && width.trim().endsWith('%')
                  ? (width.trim() as `${number}%`)
                  : Number(width),
            height,
            borderRadius: radius,
            transform: [{ scale }],
            backgroundColor: 'transparent',
          },
          style,
        ]}
      >
        {/* Background image */}
        <Image
          source={{ uri: imageUri }}
          style={{ ...StyleSheet.absoluteFillObject, borderRadius: radius }}
          contentFit="cover"
          transition={300}
          // priority and cache control help UX on mobile networks
          cachePolicy="memory-disk"
        />

        {/* Soft radial vignette to add depth */}
        <LinearGradient
          colors={['transparent', colors.vignette]}
          start={{ x: 0.5, y: 0.2 }}
          end={{ x: 0.5, y: 1 }}
          style={[StyleSheet.absoluteFill, { borderRadius: radius }]}
        />

        {/* Frosted glass layer */}
        <BlurView
          intensity={Platform.OS === 'web' ? 50 : 90}
          tint={scheme === 'dark' ? 'dark' : 'light'}
          style={[
            styles.frost,
            { borderRadius: radius, backgroundColor: colors.glassBg },
          ]}
        />

        {/* Cold translucent border (liquid edge) */}
        <View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFillObject,
            {
              borderRadius: radius,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: colors.border,
            },
          ]}
        />

        {/* Subtle inner glow */}
        <LinearGradient
          colors={['rgba(255,255,255,0.18)', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            StyleSheet.absoluteFill,
            { borderRadius: radius, mixBlendMode: undefined },
          ]}
        />

        {/* Animated sheen sweep */}
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            { borderRadius: radius, overflow: 'hidden', opacity: 0.5 },
          ]}
        >
          <Animated.View
            style={{
              position: 'absolute',
              left: 0,
              top: -height * 0.4,
              width: (typeof width === 'number' ? width : 300) * 1.6,
              height: height * 1.4,
              transform: [{ translateX: sheenTranslate }, { rotate: '18deg' }],
            }}
          >
            <LinearGradient
              colors={[
                'rgba(255,255,255,0.24)',
                'rgba(255,255,255,0.06)',
                'rgba(255,255,255,0)',
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ flex: 1 }}
            />
          </Animated.View>
        </Animated.View>

        {/* Content area: title + subtitle */}
        <View style={styles.textArea}>
          <View style={styles.textBackdrop} />
          <Text numberOfLines={1} style={[styles.title, { color: colors.title }]}>
            {' '}
            {title}{' '}
          </Text>
          {subtitle ? (
            <Text numberOfLines={2} style={[styles.subtitle, { color: colors.subtitle }]}>
              {' '}
              {subtitle}{' '}
            </Text>
          ) : null}
        </View>

        {/* Platform shadows */}
        <View
          pointerEvents="none"
          style={[
            Platform.select({
              ios: styles.shadowIos,
              android: styles.shadowAndroid,
            }) || {},
          ]}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    marginRight: 14,
  },
  frost: {
    ...StyleSheet.absoluteFillObject,
  },
  textArea: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 14,
    paddingVertical: 6,
    zIndex: 6,
  },
  textBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.2,
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '600',
    opacity: 0.95,
  },
  shadowIos: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -6,
    height: 30,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
  },
  shadowAndroid: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -6,
    height: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
  },
});
