import Vue from 'vue'
import Vuex from 'vuex'

import router from './router'

// libreria para decodificar el jwt
// import decode from 'jwt-decode'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    token: null,
    usuario: {},
    rol: '',
  },
  mutations: {
    obtenerUsuario(state, payload) {
      if (payload === null) {
        state.token = null
        state.usuario = {}
        state.rol = ''
      } else {
        state.token = payload.token
        state.usuario = payload.usuario
        state.rol = payload.usuario.rol.rol
      }
    },
  },
  actions: {
    guardarUsuario({ commit }, payload) {
      localStorage.setItem('token', payload.token)
      localStorage.setItem('role', payload.usuario.rol.rol)
      localStorage.setItem('usuario', payload.usuario)
      commit('obtenerUsuario', payload)
      const navigator = {
        estudiante: () => router.replace({ path: 'students/Form' }),
        medico: () => router.push({ path: 'medics/Form' }),
        administrador: () => router.replace({ path: '/admin/home' }),
        monitor: () => router.replace({ path: '/admin/home' }),
      }
      navigator[payload.usuario.rol.rol]()
    },
    cerrarSesion({ commit }) {
      commit('obtenerUsuario', null)
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      localStorage.removeItem('usuario')
      router.push({ name: 'Login' })
    },
    reloadState({ commit }) {
      const payload = JSON.parse(localStorage.getItem('vuex'))
      if (payload && payload.token) {
        console.log('si hay payload')
        commit('obtenerUsuario', payload)
      } else {
        commit('obtenerUsuario', null)
      }
    },
  },
  getters: {
    infoUsuario(state) {
      return (
        state.usuario.estudiante ||
        state.usuario.personal ||
        state.usuario.medico ||
        state.usuario.monitor
      )
    },
    isLoggedIn(state) {
      return state.token != null
    },
  },
  modules: {},
})
