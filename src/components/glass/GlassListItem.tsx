import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React, { PropsWithChildren, useMemo, useRef } from 'react';
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  type GestureResponderEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

export type GlassListItemProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
  left?: React.ReactNode; // avatar / icon slot
  right?: React.ReactNode; // accessory slot
  onPress?: (e: GestureResponderEvent) => void;
  intensity?: number; // blur intensity
  radius?: number;
  padding?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}>;

export const GlassListItem: React.FC<GlassListItemProps> = ({
  title,
  subtitle,
  left,
  right,
  children,
  onPress,
  intensity,
  radius = 14,
  padding = 12,
  style,
  testID,
}) => {
  const scheme = useColorScheme?.() ?? 'light';
  const isDark = scheme === 'dark';

  const blurIntensity = intensity ?? (isDark ? 20 : 30);

  const palette = useMemo(() => {
    if (isDark) {
      return {
        bg: 'rgba(8,12,20,0.22)',
        gradA: 'rgba(120,170,255,0.12)',
        gradB: 'rgba(255,235,130,0.06)',
        border: 'rgba(140,180,255,0.16)',
        title: '#F7FAFF',
        subtitle: 'rgba(255,255,255,0.78)',
      } as const;
    }
    return {
      bg: 'rgba(255,255,255,0.72)',
      gradA: 'rgba(255,255,255,0.9)',
      gradB: 'rgba(255,245,170,0.08)',
      border: 'rgba(0,0,0,0.06)',
      title: '#111',
      subtitle: 'rgba(17,17,17,0.62)',
    } as const;
  }, [isDark]);

  // press feedback animation
  const scale = useRef(new Animated.Value(1)).current;
  const handlePressIn = () =>
    Animated.spring(scale, { toValue: 0.985, useNativeDriver: true }).start();
  const handlePressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();

  const Container: any = onPress ? Pressable : View;

  return (
    <Container
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      android_ripple={
        onPress
          ? { color: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)' }
          : undefined
      }
      accessibilityRole={onPress ? 'button' : undefined}
      testID={testID}
      style={[{ borderRadius: radius, overflow: 'hidden' }, style]}
    >
      <Animated.View
        style={[
          styles.wrapper,
          {
            borderRadius: radius,
            transform: [{ scale }],
            backgroundColor: palette.bg,
          },
        ]}
      >
        <BlurView
          intensity={blurIntensity}
          tint={isDark ? 'dark' : 'light'}
          style={[StyleSheet.absoluteFill, { borderRadius: radius }]}
        />

        <LinearGradient
          colors={[palette.gradA, palette.gradB, 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[StyleSheet.absoluteFill, { borderRadius: radius }]}
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

        <View style={[styles.row, { padding }]}>
          {left ? <View style={styles.left}>{left}</View> : null}

          <View style={styles.middle}>
            <Text numberOfLines={1} style={[styles.title, { color: palette.title }]}>
              {title}
            </Text>
            {subtitle ? (
              <Text
                numberOfLines={2}
                style={[styles.subtitle, { color: palette.subtitle }]}
              >
                {subtitle}
              </Text>
            ) : null}
            {children}
          </View>

          {right ? <View style={styles.right}>{right}</View> : null}
        </View>
      </Animated.View>
    </Container>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
      },
      android: {
        elevation: 2,
      },
      default: {},
    }),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12 as any, // RN 0.71+ supports gap; cast for TS compatibility
  },
  left: {
    marginRight: 6,
    alignSelf: 'flex-start',
  },
  middle: {
    flex: 1,
  },
  right: {
    marginLeft: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '500',
  },
});

export default GlassListItem;
