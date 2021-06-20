const routes = [
  {
    path: '/reportes/casos_detectados',
    component: () => import('./views/CasosDetectados.vue'),
  },
  {
    path: '/reportes/total_casos',
    component: () => import('./views/TotalCasos.vue'),
  },
]

module.exports = routes
