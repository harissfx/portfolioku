import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // WAJIB: Sesuaikan dengan nama repo untuk GitHub Pages
  base: '/portfolioku/', 
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist', // Pastikan ini adalah folder hasil build
  }
});