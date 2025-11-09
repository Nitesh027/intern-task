import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: false,
  },
  esbuild: {
    logOverride: { 
      'this-is-undefined-in-esm': 'silent',
      'case-sensitive-file-names': 'silent'
    }
  },
  define: {
    global: 'globalThis',
  }
})
