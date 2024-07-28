import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'  // Ensures build files go to 'dist'
  },
  server: {
    port: 3000,
  },
});
