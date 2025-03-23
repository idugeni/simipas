import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  root: path.resolve(__dirname, './src/renderer'),
  publicDir: path.resolve(__dirname, './assets'),
  build: {
    outDir: path.resolve(__dirname, './dist/renderer'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, './src/renderer/index.html')
      }
    }
  },
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})