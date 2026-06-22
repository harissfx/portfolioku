import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(() => {
  return {
    // base: './' memastikan path aset bersifat relatif, 
    // ini kunci agar website tidak putih saat di-deploy
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
    
    build: {
      outDir: 'dist', // Pastikan Vercel membaca folder ini
    }
  };
});