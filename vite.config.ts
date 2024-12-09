import { resolve } from 'path';
import { defineConfig } from 'vite';
import handlebars from './vite-plugin-handlebars-precompile';

export default defineConfig({
  root: resolve(__dirname, 'src'),
  server: {
    port: 3000,
    proxy: {
      '/api/v2': {
        target: 'https://ya-praktikum.tech/api/v2',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v2/, ''),
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes, req, res) => {
            const cookies = proxyRes.headers['set-cookie'];
            if (cookies) {
              const newCookies = cookies.map((cookie) =>
                cookie.replace(/Domain=ya-praktikum.tech/i, 'Domain=localhost'),
              );
              proxyRes.headers['set-cookie'] = newCookies;
            }
          });
        },
      },
    },
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
  },
  plugins: [handlebars()],
});
