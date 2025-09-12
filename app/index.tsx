import { Redirect } from 'expo-router';
import { useAuth } from '../src/hooks/useAuth';

export default function Index() {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="./login" />;
  }

  return <Redirect href="./(tabs)/home" />;
}
