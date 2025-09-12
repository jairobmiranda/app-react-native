import { AuthResponse, LoginPayload } from './authTypes';

export async function loginRequest(data: LoginPayload): Promise<AuthResponse> {
  // Simula chamada à API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          id: '1',
          name: 'João',
          email: data.email,
          token: 'fake-jwt-token',
        },
      });
    }, 1000);
  });
}
