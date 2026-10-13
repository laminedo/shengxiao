import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Relative paths, so one build works at a domain root and in a sub-folder such as GitHub Pages.
  base: './',
  plugins: [react()],
  server: { port: 5174, strictPort: true },
})
