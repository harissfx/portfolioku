import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(() => {
  return {
    // base: './' adalah kunci agar aplikasi mencari file aset relatif 
    // terhadap lokasi index.html, sangat krusial untuk hosting statis.
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
    
    build: {
      outDir: 'dist',
      sourcemap: false,
      // Memastikan aset (gambar/font) tidak dipindahkan ke path yang salah
      assetsDir: 'assets',
    }
  };
});