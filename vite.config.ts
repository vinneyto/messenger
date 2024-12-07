import { resolve } from 'path';
import { defineConfig } from 'vite';
import handlebars from './vite-plugin-handlebars-precompile';

export default defineConfig({
  root: resolve(__dirname, 'src'),
  server: {
    port: 3000,
    proxy: {
      '/api/v2': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v2/, ''),
      },
    },
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
  },
  plugins: [handlebars()],
});
