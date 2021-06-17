const routes = [
  //departamentos
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
  //Carreras
  {
    path: '/admin/carreras',
    name: '/admin/carreras',
    component: () => import('./views/carreras/List.vue'),
  },
  {
    path: '/admin/carreras/add',
    name: '/admin/carreras/add',
    component: () => import('./views/carreras/Add.vue'),
  },
  {
    path: '/admin/carreras/update/:id',
    name: '/admin/carreras/update/:id',
    component: () => import('./views/carreras/Update.vue'),
  },
]

module.exports = routes
