import { FeatureCard } from '@/src/components/glass/FeatureCard';
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

  const onAction = () => {
    Alert.alert('Ação executada', 'Você clicou no botão de ação!');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      {/* Fundo com gradiente e partículas sutis */}
      <LinearGradient
        colors={isDark ? ['#061221', '#0c223a'] : ['#cfe8ff', '#eaf3ff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <GlassHeader title="Seu App Moderno" subtitle="Interface Liquid Glass" />

        {/* Carrossel de destaques com fotos */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 12 }}
        >
          <FeatureCard
            title="Descubra conteúdos"
            subtitle="Sugestões personalizadas para você"
            imageUri="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop"
          />
          <FeatureCard
            title="Mantenha o foco"
            subtitle="Listas, metas e progresso"
            imageUri="https://images.unsplash.com/photo-1501426026826-31c667bdf23d?q=80&w=1400&auto=format&fit=crop"
          />
          <FeatureCard
            title="Compartilhe momentos"
            subtitle="Crie álbuns com amigos"
            imageUri="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1400&auto=format&fit=crop"
          />
        </ScrollView>

        {/* Cards informativos rápidos */}
        <View style={[styles.grid, { marginTop: 18 }]}>
          <GlassCard>
            <Text style={styles.cardTitle}>Seu plano</Text>
            <Text style={styles.cardText}>Premium ativo • 28 dias restantes</Text>
          </GlassCard>
          <GlassCard>
            <Text style={styles.cardTitle}>Atividade</Text>
            <Text style={styles.cardText}>7 novas notificações hoje</Text>
          </GlassCard>
        </View>

        {/* Lista de atalhos/ações reais */}
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
      <GlassFAB icon="add" label="Ação" onPress={onAction} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 120 },
  grid: { flexDirection: 'row', gap: 12 },
  cardTitle: { color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 6 },
  cardText: { color: 'rgba(255,255,255,0.9)' },
});
