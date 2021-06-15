const routes = [
  {
    path: '/medics/Form',
    name: 'FormM',
    component: () => import('./views/Form.vue'),
    meta: {
      requireAuth: true,
      student_auth: false,
      medic_auth: true,
      admin_auth: false,
    },
  },
  {
    path: '/medics/Form/:id',
    name: 'RespuestasForm',
    component: () => import('./views/RespuestasForm.vue'),
    meta: {
      requireAuth: true,
      student_auth: false,
      medic_auth: true,
      admin_auth: false,
    },
  },
  {
    path: '/medics/Consultas',
    name: 'Consultas',
    component: () => import('./views/Consultas.vue'),
    meta: {
      requireAuth: true,
      student_auth: false,
      medic_auth: true,
      admin_auth: false,
    },
  },
  {
    path: '/medics/Consultas/:id',
    name: 'Consulta',
    component: () => import('./views/Consulta.vue'),
    meta: {
      requireAuth: true,
      student_auth: false,
      medic_auth: true,
      admin_auth: false,
    },
  },
  {
    path: '/medics/ResultadosPruebas',
    name: 'ResultadosPruebas',
    component: () => import('./views/ResultadosPruebas.vue'),
    meta: {
      requireAuth: true,
      student_auth: false,
      medic_auth: true,
      admin_auth: false,
    },
  },
]

module.exports = routes
