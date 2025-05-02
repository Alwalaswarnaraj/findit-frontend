import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': 'https://findit-95bx.onrender.com',
      '/api':'http://localhost:5000', // Change this to your backend server URL
    },
    // 👇 important for React Router to work on refresh/deep links
    historyApiFallback: true,
  },
});
