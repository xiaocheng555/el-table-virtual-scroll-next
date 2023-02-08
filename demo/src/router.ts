import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = []

// 批量引入路由
const modules = import.meta.glob('./views/*.vue', { eager: true })
Object.entries(modules).forEach(([key, _module]: any) => {
  const component = _module.default
  const name = /([^/]*)\.vue/.exec(key)?.[1]
  routes.push({
    name,
    path: `/${name}`,
    component
  })
})

export default createRouter({
  history: createWebHashHistory(),
  routes
})
