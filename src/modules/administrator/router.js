const routes = [
  {
    path: '/admin/home',
    name: '/admin/home',
    component: () => import('./views/Home.vue'),
  },
  {
    path: '/admin/departamentos',
    name: '/admin/departamentos',
    component: () => import('./views/departamentos/List.vue'),
  },
]

module.exports = routes
