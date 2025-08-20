import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub user-site = root domain, so base is "/"
export default defineConfig({
  plugins: [react()],
  base: '/'
})
