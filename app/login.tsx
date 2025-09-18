import { authApi } from '@/src/api/authApi';
import { loginSuccess } from '@/src/features/auth/authSlice';
import { setUserProfile } from '@/src/features/user/userSlice';
import { RootState } from '@/src/store';
import { Ionicons } from '@expo/vector-icons';
import { Redirect } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [biometriaAtiva, setBiometriaAtiva] = useState(false);

  // Definição de cores para tema dark/light
  // theme.sesc.modern.ts
  const theme = {
    dark: {
      background: '#061428', // fundo profundo, ainda azulado (não preto)
      card: '#0C2236', // superfície com profundidade e toque frio
      input: '#0E2A44', // campos com leve matiz azul
      border: '#254B68', // borda azul-petróleo sutil
      text: '#EAF6FF', // off-white com toque azulado (menos brilho)
      subtitle: '#9FB8C9', // azul acinzentado para secundários
      button: '#19A7FF', // azul-ciano vibrante, inovador (contraste sobre dark)
      link: '#FFC857', // amarelo/âmbar moderno para realces
      error: '#FF6B7A', // erro com boa legibilidade e personalidade
      footer: '#6E8CA0', // neutro frio para rodapés
      icon: '#FFC857', // ícones em amarelo para destaque sobre dark
    },

    light: {
      background: '#F6FAFF', // fundo claro com leve matiz azulado (mais suave que branco)
      card: '#FFFFFF', // superfície limpa
      input: '#F2F8FF', // campos com toque de azul para coerência visual
      border: '#D9EAF9', // bordas muito suaves, azul-claro
      text: '#062A44', // marinho profundo (melhor leitura que preto puro)
      subtitle: '#506976', // cinza azulado para textos secundários
      button: '#0B84FF', // azul moderno (harmoniza com Sesc, mas mais atual)
      link: '#FFC857', // mesmo amarelo/âmbar moderno para consistência
      error: '#FF5A6B', // variante clara do erro (boa visibilidade)
      footer: '#8CA3B6', // neutro para rodapé consistente com o sistema
      icon: '#0B84FF', // ícones em azul moderno no light
    },
  } as const;

  const current = colorScheme === 'dark' ? theme.dark : theme.light;

  const handleLogin = async () => {
    setLoading(true);
    try {
      const data = await authApi.login(email, password);
      dispatch(loginSuccess(data.token));
      dispatch(setUserProfile(data.user));
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  // 🔑 se já estiver logado, redireciona
  if (isAuthenticated) {
    return <Redirect href="./home" />;
  }

  return (
    <View style={[styles.container, { backgroundColor: current.background }]}>
      <View
        style={[
          styles.card,
          { backgroundColor: current.card, shadowColor: current.button },
        ]}
      >
        <Ionicons
          name="person-circle-outline"
          size={64}
          color={current.icon}
          style={styles.icon}
        />
        <Text style={[styles.title, { color: current.text }]}>Bem-vindo!</Text>
        <Text style={[styles.subtitle, { color: current.subtitle }]}>
          Faça login para continuar
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: current.input,
              color: current.text,
              borderColor: current.border,
            },
          ]}
          placeholder="Email"
          placeholderTextColor={current.subtitle}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: current.input,
              color: current.text,
              borderColor: current.border,
            },
          ]}
          placeholder="Senha"
          placeholderTextColor={current.subtitle}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}>
          <Switch
            value={biometriaAtiva}
            onValueChange={setBiometriaAtiva}
            thumbColor={biometriaAtiva ? current.button : current.border}
          />
          <Text style={{ marginLeft: 8, color: current.text, fontSize: 16 }}>
            Entrar com biometria
          </Text>
        </View>
        {error ? (
          <Text style={[styles.error, { color: current.error }]}>{error}</Text>
        ) : null}
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: current.button, shadowColor: current.button },
          ]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.link, { color: current.link }]}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.footer, { color: current.footer }]}>
        © 2025 SeuApp. Todos os direitos reservados.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    borderRadius: 20,
    padding: 30,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  icon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    fontFamily: 'System',
  },
  input: {
    width: '100%',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    fontSize: 16,
    borderWidth: 1,
  },
  button: {
    width: '100%',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 10,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
  link: {
    marginTop: 8,
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  error: {
    marginBottom: 8,
    fontSize: 14,
    textAlign: 'center',
  },
  footer: {
    fontSize: 13,
    marginTop: 30,
    textAlign: 'center',
  },
});
