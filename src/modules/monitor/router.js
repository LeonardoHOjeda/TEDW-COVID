const routes = [
  {
    path: '/monitor/Alerta',
    name: 'Alerta',
    component: () => import('./views/Alerta.vue'),
    meta: {
      requireAuth: true,
      student_auth: false,
      medic_auth: false,
      admin_auth: false,
      monitor_auth: true,
    },
  },
  {
    path: '/monitor/Trazabilidad',
    name: 'Trazabilidad',
    component: () => import('./views/Trazabilidad.vue'),
    meta: {
      requireAuth: true,
      student_auth: false,
      medic_auth: false,
      admin_auth: false,
      monitor_auth: true,
    },
  },
  {
    path: '/monitor/Orden/:id',
    name: 'Orden',
    component: () => import('./views/Orden.vue'),
    meta: {
      requireAuth: true,
      student_auth: false,
      medic_auth: false,
      admin_auth: false,
      monitor_auth: true,
    },
  },
  {
    path: '/monitor/Enviar/:orden',
    name: 'Enviar',
    component: () => import('./views/Enviar.vue'),
    meta: {
      requireAuth: true,
      student_auth: false,
      medic_auth: false,
      admin_auth: false,
      monitor_auth: true,
    },
  },
  {
    path: '/monitor/Trazo',
    name: 'Trazo',
    component: () => import('./views/Trazo.vue'),
    meta: {
      requireAuth: true,
      student_auth: false,
      medic_auth: false,
      admin_auth: false,
      monitor_auth: true,
    },
  },
  {
    path: '/monitor/Trazar',
    name: 'Trazar',
    component: () => import('./views/Trazar.vue'),
    meta: {
      requireAuth: true,
      student_auth: false,
      medic_auth: false,
      admin_auth: false,
      monitor_auth: true,
    },
  },
  {
    path: '/monitor/TrazarPersona',
    name: 'TrazarPersona',
    component: () => import('./views/TrazarPersona.vue'),
    meta: {
      requireAuth: true,
      student_auth: false,
      medic_auth: false,
      admin_auth: false,
      monitor_auth: true,
    },
  },
]

module.exports = routes
