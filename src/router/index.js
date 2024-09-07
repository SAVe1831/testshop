import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },

  history: createWebHashHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/Home.vue')
    },
    {
      path: '/product1',
      name: 'product1',
      component: () => import('../pages/Product1.vue')
    },
    {
      path: '/product2',
      name: 'product2',
      component: () => import('../pages/Product2.vue')
    },
    {
      path: '/product3',
      name: 'product3',
      component: () => import('../pages/Product3.vue')
    },
    {
      path: '/product4',
      name: 'product4',
      component: () => import('../pages/Product4.vue')
    },
    {
      path: '/product5',
      name: 'product5',
      component: () => import('../pages/Product5.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (window.innerWidth < 768) {
    next(); // разрешить переход
  } else {
    next(false); // отменить переход
  }
});

export default router
