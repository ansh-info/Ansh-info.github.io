import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',  // Important: keep this as root
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})