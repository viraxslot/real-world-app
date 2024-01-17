const env = import.meta.env;

export const Config = {
  apiUrl: env.VITE_API_URL,
  devMode: env.VITE_ENABLE_DEV_MODE === 'true',
};
