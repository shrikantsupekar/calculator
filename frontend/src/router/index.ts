import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/pages/Home.vue'),
    },
    {
      path: '/logs',
      component: () => import('@/pages/AuditLogs.vue'),
    },
  ],
})

export default router
