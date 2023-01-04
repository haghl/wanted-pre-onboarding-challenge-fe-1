import * as path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@api', replacement: path.resolve(__dirname, 'src/api') },
      { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@layout', replacement: path.resolve(__dirname, 'src/layout') },
      { find: '@store', replacement: path.resolve(__dirname, 'src/store') },
      { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
    ],
  },
})
