import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Router from './router.ts'

const app = createApp(App)
app.use(ElementPlus)
app.use(Router)
app.mount('#app')
