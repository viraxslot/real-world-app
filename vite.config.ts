/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: 'src/config',
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  test: {
    include: ['./src/**/*test.{ts,tsx}'],
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
  },
});
