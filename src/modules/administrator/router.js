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
  {
    path: '/admin/departamentos/add',
    name: '/admin/departamentos/add',
    component: () => import('./views/departamentos/Add.vue'),
  },
  {
    path: '/admin/departamentos/update/:id',
    name: '/admin/departamentos/update/:id',
    component: () => import('./views/departamentos/Update.vue'),
  },
]

module.exports = routes
