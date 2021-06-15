const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('./views/Login.vue'),
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('./views/SignUp.vue'),
  },
]

module.exports = routes
