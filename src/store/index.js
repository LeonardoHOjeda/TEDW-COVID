import Vue from 'vue'
import Vuex from 'vuex'

import router from '../router'

// libreria para decodificar el jwt
// import decode from 'jwt-decode'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: '',
        usuarioDB: '',
        rol: ''
    },
    mutations: {
        obtenerUsuario(state, payload) {
            state.token = payload.token;
            if (payload === '') {
                state.usuarioDB = '';
                state.rol = '';
            } else {
                state.usuarioDB = payload.usuario;
                state.rol = payload.usuario.rol.rol;
                if (state.rol === 'estudiante') {
                    router.push({ path: 'students/Form' })
                }
            }
        }
    },
    actions: {
        guardarUsuario({ commit }, payload) {
            localStorage.setItem('token', payload.token)
            localStorage.setItem('role', payload.usuario.rol.rol)
            commit('obtenerUsuario', payload)
        },
        cerrarSesion({ commit }) {
            commit('obtenerUsuario', '')
            localStorage.removeItem('token')
            localStorage.removeItem('role')
            router.push({ name: 'Login' })
        }
    },
    modules: {}
})