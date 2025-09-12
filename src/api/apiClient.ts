import axios from 'axios';

const apiClient = axios.create({
  baseURL:
    process.env.EXPO_PUBLIC_API_URL ||
    'https://webhook.site/2cacce5e-dd9c-4006-b80a-7107f0487a7d',
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
