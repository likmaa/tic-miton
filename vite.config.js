import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'

// https://vite.dev/config/
// Base URL
// - Utilise VITE_BASE_URL si défini (ex: "/" pour domaine racine, "/tic-miton/" pour sous-chemin)
// - Sinon, par défaut "/" (recommandé pour nom de domaine personnalisé)
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const base = env.VITE_BASE_URL || '/'
  return {
    base,
    plugins: [react(), imagetools()],
  }
})
