import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../layouts/AppLayout.vue'),
      redirect: '/today',
      children: [
        {
          path: 'today', component: () => import('../pages/TodayPage.vue'),
          meta: { title: 'Hoje', subtitle: 'Posts de todos os feeds para hoje' }
        },
        {
          path: 'add-feeds', component: () => import('../pages/AddFeedsPage.vue'),
          meta: { title: 'Adicionar feeds', subtitle: 'Adicione novos feeds para ler' }
        },
        {
          path: 'search', component: () => import('../pages/SearchPage.vue'),
          meta: { title: 'Buscar', subtitle: 'Busque por feeds' }
        },
        {
          path: 'favorites', component: () => import('../pages/FavoritesPage.vue'),
          meta: { title: 'Favoritos', subtitle: 'Posts de feeds favoritos' }
        },
        {
          path: 'read-later', component: () => import('../pages/ReadLater.vue'),
          meta: { title: 'Ler mais tarde', subtitle: 'Posts de feeds para ler mais tarde' }
        },
        {
          path: 'recently-read', component: () => import('../pages/RecentlyRead.vue'),
          meta: { title: 'Lidos recentemente', subtitle: 'Posts de feeds lidos recentemente' }
        },
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
})

export default router
