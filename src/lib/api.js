import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
});

// Add token to headers if it exists, and handle SSR baseURL
API.interceptors.request.use((config) => {
  if (typeof window === 'undefined') {
    const port = process.env.PORT || 3000;
    const host = process.env.NEXT_PUBLIC_APP_URL || `http://localhost:${port}`;
    if (config.baseURL && config.baseURL.startsWith('/')) {
      config.baseURL = `${host}${config.baseURL}`;
    } else if (!config.baseURL && config.url?.startsWith('/')) {
      config.baseURL = host;
    }
  } else {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo && userInfo.token) {
        config.headers.Authorization = `Bearer ${userInfo.token}`;
      }
    } catch {
      // Ignore JSON parse errors
    }
  }
  return config;
});

export default API;
