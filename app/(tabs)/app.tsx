import { GlassCard } from '@/src/components/glass/GlassCard';
import { GlassFAB } from '@/src/components/glass/GlassFAB';
import { GlassHeader } from '@/src/components/glass/GlassHeader';
import { GlassListItem } from '@/src/components/glass/GlassListItem';
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

export default function App() {
  const colorScheme = useColorScheme?.() ?? 'light';
  const isDark = colorScheme === 'dark';
  const textPrimary = isDark ? '#fff' : '#111';
  const textSecondary = isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.7)';

  const onAction = () => {
    Alert.alert('Ação executada', 'Você clicou no botão de ação!');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      {/* Fundo com gradiente e partículas sutis */}
      <LinearGradient
        colors={isDark ? ['#061221', '#0c223a'] : ['#d9ecff', '#eef6ff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <GlassHeader title="Seu App Moderno" subtitle="Interface Liquid Glass" />

        {/* Cards de destaque */}
        <View style={styles.grid}>
          <GlassCard>
            <Text style={[styles.cardTitle, { color: textPrimary }]}>Bem-vindo</Text>
            <Text style={[styles.cardText, { color: textSecondary }]}>
              Esse é um template inicial com estilo vidro translúcido.
            </Text>
          </GlassCard>
          <GlassCard>
            <Text style={[styles.cardTitle, { color: textPrimary }]}>Status</Text>
            <Text style={[styles.cardText, { color: textSecondary }]}>
              Tudo pronto para começar a construir sua experiência.
            </Text>
          </GlassCard>
        </View>

        {/* Lista de atalhos/ações */}
        <View style={{ marginTop: 12 }}>
          <GlassListItem title="Perfil" subtitle="Veja e edite suas informações" />
          <GlassListItem
            title="Notificações"
            subtitle="Gerencie seus alertas e preferências"
          />
          <GlassListItem title="Configurações" subtitle="Tema, acessibilidade e mais" />
        </View>
      </ScrollView>

      {/* Botão de ação flutuante */}
      {/* Posicionar acima da TabBar (70px) + margem */}
      <GlassFAB icon="add" label="Ação" onPress={onAction} bottom={90} right={20} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  // paddingBottom maior para não colidir com a TabBar e o FAB
  scrollContent: { padding: 16, paddingBottom: 180 },
  grid: { flexDirection: 'row', gap: 12 },
  cardTitle: { color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 6 },
  cardText: { color: 'rgba(255,255,255,0.9)' },
});
