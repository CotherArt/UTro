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
      component: () => import('@/views/auth/InicioSesionView.vue')
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
      path: '/wishlist',
      name: 'wishlist',
      component: () => import('@/views/WishListView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/ContactView.vue')
    }
  ]
})

export default router
