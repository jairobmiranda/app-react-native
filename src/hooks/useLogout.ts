import { logout } from '@/src/features/auth/authSlice';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { clearUserProfile } from '../features/user/userSlice';

export function useLogout() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearUserProfile());
    router.replace('/login'); // redireciona para a tela de login
  };

  return handleLogout;
}
