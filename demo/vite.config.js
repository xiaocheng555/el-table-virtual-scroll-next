import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import buildDemoFiles from './build/buildDemoFiles.js'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  define: {
    demoFiles: buildDemoFiles()
  },
  resolve: {
    extensions: ['.vue', '.mjs', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      'el-table-virtual-scroll-next': path.resolve('../src/index.js')
    }
  }
})
