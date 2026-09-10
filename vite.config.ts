import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The app is fully client-side and has no backend: no env plumbing needed.
export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
