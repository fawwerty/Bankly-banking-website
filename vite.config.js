import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Use the GitHub Pages subpath only for production builds. During dev we
  // want the root path to avoid Vite trying to resolve built assets under
  // `/Bankly-banking-website/` which breaks the dev server.
  base: process.env.NODE_ENV === 'production' ? '/Bankly-banking-website/' : '/',
  server: {
    port: 3000,
    host: true
  }
});
