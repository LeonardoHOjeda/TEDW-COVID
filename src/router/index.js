import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import store from '../store'

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
        name: 'HomeS',
        component: () =>
            import ('../views/students/Home.vue'),
        meta: { requireAuth: true }
    },
    {
        path: '/students/Form',
        name: 'FormS',
        component: () =>
            import ('../views/students/Form.vue'),
        meta: {
            // requireAuth: true,
            student_auth: true,
            // admin_auth: false
        }
    },
    {
        path: '/students/Appointment',
        name: 'Appointment',
        component: () =>
            import ('../views/students/Appointment.vue'),
        meta: {
            // requireAuth: true,
            student_auth: true,
            // admin_auth: false
        }
    },
    {
        path: '/students/PrintRecipe',
        name: 'PrintRecipe',
        component: () =>
            import ('../views/students/PrintRecipe.vue'),
        meta: {
            // requireAuth: true,
            student_auth: true,
            admin_auth: false
        }
    },
    {
        path: '/students/Alertas',
        name: 'Alertas',
        component: () =>
            import ('../views/students/Alertas.vue'),
        meta: {
            // requireAuth: true,
            student_auth: true,
            admin_auth: false
        }
    },
    // Medicos
    {
        path: '/medics/Form',
        name: 'FormM',
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

router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('token');
    let role = localStorage.getItem('role');
    if (to.meta.requireAuth) {
        if (!role || !token) {
            // next({ name: 'Login' })
            router.push({ name: 'Login' })
                .catch(() => true)
        } else
        if (to.meta.admin_auth) {
            if (role === 'administrador') {
                return next();
            } else {
                // next({ name: 'Login' })
                router.push({ name: 'Login' })
            }
        } else
        if (to.meta.student_auth) {
            if (role === 'estudiante') {
                next();
            } else {
                // next({ name: 'Login' })
                router.push({ name: 'Login' })
                    .catch(() => true)
            }
        }
    } else {
        return next();
    }

    // const rutaProtegia = to.matched.some(record => record.meta.requireAuth)
    // if (rutaProtegia && store.state.token === '') {
    //     next({ name: 'Login' });
    // } else {
    //     next();
    // }
});

export default router