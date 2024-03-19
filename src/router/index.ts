import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/StoreView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LogInView.vue')
    },
    {
      path: '/restore',
      name: 'restore',
      component: () => import('@/views/auth/RestorePasswordView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/RegistrarseView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/ContactView.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/TestView.vue')
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('@/views/SiteMapView.vue')
    },
    {
      path: '/user/settings',
      name: 'settings',
      component: () => import('@/views/user/SettingsView.vue')
    },
    {
      path: '/search/:name',
      name: 'search',
      component: () => import('@/views/search/SearchView.vue')
    }
  ]
})

export default router
