import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../layouts/AppLayout.vue'),
      redirect: '/today',
      children: [
        { path: 'today', component: () => import('../pages/TodayPage.vue'), meta: { title: 'Hoje' } },
        { path: 'add-feeds', component: () => import('../pages/AddFeedsPage.vue') },
        { path: 'search', component: () => import('../pages/SearchPage.vue') },
        { path: 'favorites', component: () => import('../pages/FavoritesPage.vue') },
        { path: 'read-later', component: () => import('../pages/ReadLater.vue') },
        { path: 'recently-read', component: () => import('../pages/RecentlyRead.vue') },
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
})

export default router
