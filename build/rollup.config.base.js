import resolve from 'rollup-plugin-node-resolve'
import { eslint } from 'rollup-plugin-eslint'
import commonjs from 'rollup-plugin-commonjs'
import autoprefixer from 'autoprefixer'
import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
import babel from 'rollup-plugin-babel'

export default {
  input: './src/index.js',
  plugins: [
    resolve({ extensions: ['.js', '.vue'] }),
    eslint({
      exclude: 'node_modules/**'
    }),
    vue(),
    postcss({
      plugins: [autoprefixer()]
    }),
    babel({
      exclude: 'node_modules/**',
      extensions: ['.js', '.vue']
    }),
    commonjs()
  ],
  // 外部模块
  external: ['vue', 'lodash']
}
