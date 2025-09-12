import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const useAuth = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return isAuthenticated;
};
