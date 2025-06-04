  import axios from 'axios';
  import { getAuthHeader } from './auth';

  const api = axios.create({
    baseURL: 'https://kriingg.rawp.my.id/api',
  });

  // Tambahkan Authorization Header ke semua request
  api.interceptors.request.use(
    async (config) => {
      const authHeader = await getAuthHeader();
      config.headers = {
        ...config.headers,
        ...authHeader,
      };
      return config;
    },
    (error) => Promise.reject(error)
  );

  export default api;
