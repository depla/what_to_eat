import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // '/api': 'http://localhost:3000' // Adjust the port if your Express server is running on a different port
      '/api': 'https://what-to-eat-zeta-nine.vercel.app/' // Adjust the port if your Express server is running on a different port
    }
  }
})
