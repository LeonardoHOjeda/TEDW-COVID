const routes = [
  {
    path: '/students/Home',
    name: 'HomeS',
    component: () => import('./views/Home.vue'),
    meta: { requireAuth: true },
  },
  {
    path: '/students/Form',
    name: 'FormS',
    component: () => import('./views/Form.vue'),
    meta: {
      requireAuth: true,
      student_auth: true,
      admin_auth: false,
      medic_auth: false,
    },
  },
  {
    path: '/students/Appointment',
    name: 'Appointment',
    component: () => import('./views/Appointment.vue'),
    meta: {
      requireAuth: true,
      student_auth: true,
      admin_auth: false,
      medic_auth: false,
    },
  },
  {
    path: '/students/PrintRecipe',
    name: 'PrintRecipe',
    component: () => import('./views/PrintRecipe.vue'),
    meta: {
      requireAuth: true,
      student_auth: true,
      admin_auth: false,
      medic_auth: false,
    },
  },
  {
    path: '/students/Alertas',
    name: 'Alertas',
    component: () => import('./views/Alertas.vue'),
    meta: {
      requireAuth: true,
      student_auth: true,
      admin_auth: false,
      medic_auth: false,
    },
  },
]

module.exports = routes
