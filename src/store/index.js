import Vue from 'vue'
import Vuex from 'vuex'

import router from '../router'

// libreria para decodificar el jwt
// import decode from 'jwt-decode'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        token: '',
        usuario: '',
        rol: ''
    },
    mutations: {
        obtenerUsuario(state, payload) {
            state.token = payload.token;
            if (payload === '') {
                state.usuario = '';
                state.rol = '';
            } else {
                state.usuario = payload.usuario;
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
            localStorage.setItem('usuario', payload.usuario)
            commit('obtenerUsuario', payload)
        },
        cerrarSesion({ commit }) {
            commit('obtenerUsuario', '')
            localStorage.removeItem('token')
            localStorage.removeItem('role')
            localStorage.removeItem('usuario')
            localStorage.removeItem('vuex')
            router.push({ name: 'Login' })
        },
        leerToken({ commit }) {
            const payload = JSON.parse(localStorage.getItem('vuex'))
                // const usuarioDB = localStorage.getItem('usuarioDB');
            if (payload) {
                console.log(payload);
                console.log(payload.usuario);
                console.log(payload.role);
                commit('obtenerUsuario', payload)
            } else {
                commit('obtenerUsuario', '')
            }
        }
    },
    modules: {},

})