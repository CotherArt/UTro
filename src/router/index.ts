import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/StoreView.vue'
import SiteMapView from '@/views/SiteMapView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/InicioSesionView.vue')
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
      path: '/communuty',
      name: 'community',
      component: () => import('@/views/CommunityView.vue')
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
      component: SiteMapView
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/404View.vue')
    },
    {
      path: '/user/settings',
      name: 'settings',
      component: () => import('@/views/user/SettingsView.vue')
    }
  ]
})

export default router
