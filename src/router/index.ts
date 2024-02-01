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
      path: '/iniciar-sesion',
      name: 'iniciar-sesion',
      component: () => import('@/views/auth/InicioSesionView.vue')
    },
    {
      path: '/registrarse',
      name: 'registrarse',
      component: () => import('@/views/auth/RegistrarseView.vue')
    },
    {
      path: '/communuty',
      name: 'community',
      component: () => import('@/views/CommunityView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/support',
      name: 'support',
      component: () => import('@/views/SupportView.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/TestView.vue')
    },
    {
      path: '/test/sub-test',
      name: 'sub test',
      component: () => import('@/views/TestView2.vue')
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('@/views/Site_map.vue') 
    }
  ]
})

export default router
