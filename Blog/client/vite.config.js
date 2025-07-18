import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      'tailwindcss/version.js': path.resolve(__dirname, 'src/empty-tailwind-version.js'),
    },
  },
  optimizeDeps: {
    exclude: ['tailwindcss/version.js'],
    include: ['moment']
  },
  build: {
    rollupOptions: {
      external: ['tailwindcss/version.js'],
    },
  },
})