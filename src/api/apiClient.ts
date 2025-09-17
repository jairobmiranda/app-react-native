import axios from 'axios';

const apiClient = axios.create({
  baseURL:
    process.env.EXPO_PUBLIC_API_URL ||
    'https://webhook.site/c48aad15-dee6-4b6f-b975-0f3e5f759956',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptador para adicionar token
apiClient.interceptors.request.use(async (config) => {
  // pegar token do redux ou asyncStorage
  // ex:
  // const token = store.getState().auth.token;
  const token = null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
