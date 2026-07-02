import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  // .glb models and other large binaries live in /public and are served as-is.
  assetsInclude: ['**/*.glb'],
});
