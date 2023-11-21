import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import buildDemoFiles from './build/buildDemoFiles.js'

const useLocalLib = process.argv.at(-1) !== 'test' // 使用本地的库
const alias = useLocalLib ? {
  'el-table-virtual-scroll-next': path.resolve('../index.js')
} : ''

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
      ...alias
    }
  }
})
