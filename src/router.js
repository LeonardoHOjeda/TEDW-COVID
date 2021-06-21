import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '../store'

Vue.use(VueRouter)

const routes = [
    ...require('./modules/home/router'),
    ...require('./modules/login/router'),
    ...require('./modules/students/router'),
    ...require('./modules/medics/router'),
    ...require('./modules/administrator/router'),
    ...require('./modules/director/router'),
    ...require('./modules/reportes/router'),
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('token')
    let role = localStorage.getItem('role')
    if (to.meta.requireAuth) {
        if (!role || !token) {
            // next({ name: 'Login' })
            router.push({ name: 'Login' }).catch(() => true)
        } else if (to.meta.admin_auth) {
            if (role === 'administrador') {
                return next()
            } else {
                // next({ name: 'Login' })
                router.push({ name: 'Login' })
            }
        } else if (to.meta.student_auth) {
            if (role === 'estudiante') {
                next()
            } else {
                // next({ name: 'Login' })
                router.push({ name: 'Login' }).catch(() => true)
            }
        } else if (to.meta.medic_auth) {
            if (role === 'medico') {
                next()
            } else {
                // next({ name: 'Login' })
                router.push({ name: 'Login' }).catch(() => true)
            }
        } else if (to.meta.director_auth) {
            if (role === 'directivo') {
                next()
            } else {
                // next({ name: 'Login' })
                router.push({ name: 'Login' }).catch(() => true)
            }
        }
    } else {
        return next()
    }

    // const rutaProtegia = to.matched.some(record => record.meta.requireAuth)
    // if (rutaProtegia && store.state.token === '') {
    //     next({ name: 'Login' });
    // } else {
    //     next();
    // }
})

export default router