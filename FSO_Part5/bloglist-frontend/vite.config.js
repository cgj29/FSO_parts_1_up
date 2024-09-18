import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
/**
 * below is where we define the redirect for requests made to /api
 * in this case they are sent to localhost:3001
 * the port where our backend is configured to broadcast to
 */
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './testSetup.js'
  },
})
