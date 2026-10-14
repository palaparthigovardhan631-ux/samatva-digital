import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path for GitHub Pages — must match your repo name exactly
  // e.g. https://YOUR_USERNAME.github.io/samatva-digital/
  base: '/samatva-digital/',
})
