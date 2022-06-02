import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'komik.index',
    component: () => import("@/views/komik/Index.vue")
  },
  {
    path: '/add',
    name: 'komik.create',
    component: () => import("@/views/komik/Create.vue")
  },
  {
    path: '/edit/:id',
    name: 'komik.edit',
    component: () => import("@/views/komik/Edit.vue")
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
