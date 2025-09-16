import { useLogout } from '@/src/hooks/useLogout';
import { theme } from '@/src/theme/theme';
import { StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import { useDispatch } from 'react-redux';
// Supondo que você tenha um arquivo de tema

export default function Home() {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const colors = colorScheme === 'dark' ? theme.dark.colors : theme.light.colors;
  const fonts = theme.fonts;

  // Função para lidar com o clique no botão de sair
  const logout = useLogout();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.primary, fontFamily: fonts.bold }]}>
        👤 Meu Perfil
      </Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={logout}
      >
        <Text
          style={[
            styles.buttonText,
            { color: colors.background, fontFamily: fonts.bold },
          ]}
        >
          Sair
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24, fontWeight: 'bold', margin: 16 },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 24,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
