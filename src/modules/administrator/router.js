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
  //Medicamentos
  {
    path: '/admin/medicamentos',
    name: '/admin/medicamentos',
    component: () => import('./views/medicamentos/List.vue'),
  },
  {
    path: '/admin/medicamentos/add',
    name: '/admin/medicamentos/add',
    component: () => import('./views/medicamentos/Add.vue'),
  },
  {
    path: '/admin/medicamentos/update/:id',
    name: '/admin/medicamentos/update/:id',
    component: () => import('./views/medicamentos/Update.vue'),
  },
  //Tipos de Prueba
  {
    path: '/admin/tipo_prueba',
    name: '/admin/tipo_prueba',
    component: () => import('./views/tipo_prueba/List.vue'),
  },
  {
    path: '/admin/tipo_prueba/add',
    name: '/admin/tipo_prueba/add',
    component: () => import('./views/tipo_prueba/Add.vue'),
  },
  {
    path: '/admin/tipo_prueba/update/:id',
    name: '/admin/tipo_prueba/update/:id',
    component: () => import('./views/tipo_prueba/Update.vue'),
  },
  //Estudiantes
  {
    path: '/admin/estudiantes',
    name: '/admin/estudiantes',
    component: () => import('./views/estudiantes/List.vue'),
  },
  {
    path: '/admin/estudiantes/add',
    name: '/admin/estudiantes/add',
    component: () => import('./views/estudiantes/Add.vue'),
  },
  {
    path: '/admin/estudiantes/update/:id',
    name: '/admin/estudiantes/update/:id',
    component: () => import('./views/estudiantes/Update.vue'),
  },
  //Personal
  {
    path: '/admin/personal',
    name: '/admin/personal',
    component: () => import('./views/personal/List.vue'),
  },
  {
    path: '/admin/personal/add',
    name: '/admin/personal/add',
    component: () => import('./views/personal/Add.vue'),
  },
  {
    path: '/admin/personal/update/:id',
    name: '/admin/personal/update/:id',
    component: () => import('./views/personal/Update.vue'),
  },
]

module.exports = routes
