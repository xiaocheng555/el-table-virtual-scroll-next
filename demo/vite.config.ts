import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import buildDemoFiles from './build/buildDemoFiles.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    global: {
      demoFiles: buildDemoFiles()
    }
  },
  resolve: {
    extensions: ['.vue', '.mjs', '.js', '.json', '.tsx', '.ts'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      'el-table-virtual-scroll': path.resolve('../src/index.js')
    }
  }
})
