import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Duas páginas no mesmo build: CocaisTech em / e Ludus em /ludus/.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        cocais: resolve(__dirname, 'index.html'),
        ludus: resolve(__dirname, 'ludus/index.html'),
      },
    },
  },
});
