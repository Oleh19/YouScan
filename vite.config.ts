import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('recharts')) {
              return 'recharts'
            }
            if (id.includes('react-dnd') || id.includes('dnd-core')) {
              return 'react-dnd'
            }
            return 'vendor'
          }
        },
      },
    },
  },
})
