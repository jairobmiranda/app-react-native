import { theme } from '@/src/theme/theme';
import { StyleSheet, Text, View, useColorScheme } from 'react-native';
// Supondo que você tenha um arquivo de tema

export default function Home() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? theme.dark.colors : theme.light.colors;
  const fonts = theme.fonts;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.primary, fontFamily: fonts.bold }]}>
        🏠 Página Inicial
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24, fontWeight: 'bold', margin: 16 },
});
