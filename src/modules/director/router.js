const routes = [
    //departamentos
    {
        path: '/director/home',
        name: '/director/home',
        component: () =>
            import ('./views/Home.vue'),
    },
    {
        path: '/director/Dashboard',
        name: '/director/Dashboard',
        component: () =>
            import ('./views/Dashboard.vue'),
    },
]

module.exports = routes