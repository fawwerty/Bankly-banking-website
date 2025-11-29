import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Bankly-banking-website/', // Important for GitHub Pages
  server: {
    port: 3000,
    host: true
  }
});
