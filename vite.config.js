import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'

// https://vite.dev/config/
// Note: Use a different base in production for GitHub Pages (repo subpath)
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/tic-miton/' : '/',
  plugins: [react(), imagetools()],
}))
