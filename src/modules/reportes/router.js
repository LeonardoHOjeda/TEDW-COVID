const routes = [
  {
    path: '/reportes/casos_detectados',
    component: () => import('./views/CasosDetectados.vue'),
  },
  {
    path: '/reportes/total_casos',
    component: () => import('./views/TotalCasos.vue'),
  },
  {
    path: '/reportes/total_encuestas',
    component: () => import('./views/TotalEncuestas.vue'),
  },
  {
    path: '/reportes/total_consultas',
    component: () => import('./views/TotalConsultas.vue'),
  },
]

module.exports = routes
