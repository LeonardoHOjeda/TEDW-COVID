import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    // Menu principal
    {
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
        path: '/signup',
        name: 'SignUp',
        component: () =>
            import ('../views/SignUp.vue')
    },
    // Estudiantes
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
    // Medicos
    {
        path: '/medics/Form',
        name: 'Form',
        component: () =>
            import ('../views/medics/Form.vue')
    },
    {
        path: '/medics/Form/:id',
        name: 'RespuestasForm',
        component: () =>
            import ('../views/medics/RespuestasForm.vue')
    },
    {
        path: '/medics/Consultas',
        name: 'Consultas',
        component: () =>
            import ('../views/medics/Consultas.vue')
    },
    {
        path: '/medics/Consultas/:id',
        name: 'Consulta',
        component: () =>
            import ('../views/medics/Consulta.vue')
    },
    {
        path: '/medics/ResultadosPruebas',
        name: 'ResultadosPruebas',
        component: () =>
            import ('../views/medics/ResultadosPruebas.vue')
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router