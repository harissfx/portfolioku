import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

// Menangani __dirname di modul ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(() => {
  return {
    // 1. PENTING: base: './' memastikan path aset (JS/CSS) bersifat relatif
    // sehingga tidak error 404 saat di-deploy
    base: './', 
    
    plugins: [
      react(), 
      tailwindcss()
    ],
    
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    
    // 2. Opsi tambahan untuk memastikan build lebih stabil
    build: {
      outDir: 'dist',
      sourcemap: false,
    }
  };
});