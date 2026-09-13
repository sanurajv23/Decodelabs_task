import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // The existing router is installed in the parent project; share this app's React.
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
})
