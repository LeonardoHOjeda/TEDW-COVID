import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: () =>
            import ('../views/About.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../views/Login.vue')
    },
    {
        path: '/students/Home',
        name: 'Home',
        component: () =>
            import ('../views/students/Home.vue')
    },
    {
        path: '/students/Form',
        name: 'Form',
        component: () =>
            import ('../views/students/Form.vue')
    },
    {
        path: '/students/Appointment',
        name: 'Appointment',
        component: () =>
            import ('../views/students/Appointment.vue')
    },
    {
        path: '/students/PrintRecipe',
        name: 'PrintRecipe',
        component: () =>
            import ('../views/students/PrintRecipe.vue')
    },
    {
        path: '/medics/Form',
        name: 'Form',
        component: () =>
            import ('../views/medics/Form.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router