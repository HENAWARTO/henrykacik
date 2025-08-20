import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For a project site at /henrykacik/
export default defineConfig({
  plugins: [react()],
  base: '/henrykacik/'
})
