import { GlassButton } from '@/src/components/glass/GlassButton';
import { GlassCard } from '@/src/components/glass/GlassCard';
import { GlassHeader } from '@/src/components/glass/GlassHeader';
import { GlassListItem } from '@/src/components/glass/GlassListItem';
import { useLogout } from '@/src/hooks/useLogout';
import { theme } from '@/src/theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

export default function Profile() {
  const colorScheme = useColorScheme?.() ?? 'light';
  const isDark = colorScheme === 'dark';
  const colors = isDark ? theme.dark.colors : theme.light.colors;
  const textPrimary = isDark ? '#fff' : '#111';
  const textSecondary = isDark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.65)';
  const logout = useLogout();

  const avatarUri =
    'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=800&auto=format&fit=crop';

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      {/* Fundo aquoso */}
      <LinearGradient
        colors={isDark ? ['#061221', '#0c223a'] : ['#d9ecff', '#eef6ff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView contentContainerStyle={styles.scroll}>
        <GlassHeader title="Meu Perfil" subtitle="Bem-vindo de volta" />

        {/* Avatar + nome */}
        <View style={styles.center}>
          <View style={styles.avatarWrapper}>
            <Image source={{ uri: avatarUri }} style={styles.avatar} contentFit="cover" />
            {/* Anel translúcido */}
            <View style={styles.avatarRing} pointerEvents="none" />
            {/* Sheen sutil */}
            <LinearGradient
              colors={['rgba(255,245,170,0.35)', 'rgba(255,255,255,0.0)']}
              start={{ x: 0.1, y: 0 }}
              end={{ x: 0.9, y: 0.4 }}
              style={styles.avatarSheen}
            />
          </View>
          <Text style={[styles.name, { color: textPrimary }]}>Alex Martins</Text>
          <Text style={[styles.handle, { color: textSecondary }]}>@alexmart</Text>
        </View>

        {/* Stats */}
        <GlassCard>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={[styles.statValue, { color: textPrimary }]}>128</Text>
              <Text style={[styles.statLabel, { color: textSecondary }]}>Posts</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statBox}>
              <Text style={[styles.statValue, { color: textPrimary }]}>2.4k</Text>
              <Text style={[styles.statLabel, { color: textSecondary }]}>Seguidores</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statBox}>
              <Text style={[styles.statValue, { color: textPrimary }]}>312</Text>
              <Text style={[styles.statLabel, { color: textSecondary }]}>Seguindo</Text>
            </View>
          </View>
        </GlassCard>

        {/* Ações */}
        <View style={styles.actionsRow}>
          <GlassButton
            title="Editar perfil"
            onPress={() =>
              Alert.alert('Editar', 'Funcionalidade de edição em desenvolvimento.')
            }
          />
          <GlassButton title="Sair" onPress={logout} />
        </View>

        {/* Sobre */}
        <GlassCard>
          <Text style={[styles.sectionTitle, { color: textPrimary }]}>Sobre</Text>
          <Text style={[styles.sectionText, { color: textSecondary }]}>
            Designer e desenvolvedor mobile apaixonado por interfaces fluídas e
            experienciais. Amo café, trilhas e fotografia.
          </Text>
        </GlassCard>

        {/* Preferências/Configurações */}
        <View style={{ marginTop: 12 }}>
          <GlassListItem
            title="Conta"
            subtitle="Email, senha e segurança"
            right={
              <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.9)" />
            }
          />
          <GlassListItem
            title="Privacidade"
            subtitle="Permissões e dados"
            right={
              <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.9)" />
            }
          />
          <GlassListItem
            title="Notificações"
            subtitle="Alertas e lembretes"
            right={
              <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.9)" />
            }
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 16, paddingBottom: 120 },
  center: { alignItems: 'center', marginTop: 12 },
  avatarWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    backgroundColor: 'rgba(10,30,50,0.2)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(190,220,255,0.4)',
  },
  avatar: { width: '100%', height: '100%' },
  avatarRing: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 60,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,245,170,0.35)',
  },
  avatarSheen: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    height: '50%',
  },
  name: { marginTop: 12, color: '#fff', fontSize: 20, fontWeight: '700' },
  handle: { color: 'rgba(240,248,255,0.9)', marginTop: 2 },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statBox: { flex: 1, alignItems: 'center', paddingVertical: 8 },
  statValue: { color: '#fff', fontSize: 18, fontWeight: '700' },
  statLabel: { color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  divider: { width: 1, height: 30, backgroundColor: 'rgba(190,220,255,0.25)' },
  actionsRow: { flexDirection: 'row', gap: 12, marginTop: 12 },
  sectionTitle: { color: '#fff', fontWeight: '700', marginBottom: 6 },
  sectionText: { color: 'rgba(255,255,255,0.9)' },
});
