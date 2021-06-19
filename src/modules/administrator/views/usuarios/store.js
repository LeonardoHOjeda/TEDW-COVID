//State de usuarios
import axios from 'axios'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    usuario: null,
    error: null,
  },
  mutations: {
    setUsuario(state, payload) {
      state.usuario = payload
    },
    setError(state, payload) {
      if (payload == null) return (state.error = null)
      state.error = {
        status: payload.response.status,
        message: payload.response.data.message || payload.message,
      }
    },
  },
  actions: {
    async fetchUsuario({ commit }, payload) {
      try {
        const resp = await axios.get(`/usuarios/${payload}`)
        commit('setUsuario', resp.data)
      } catch (error) {
        commit('setError', error)
      }
    },

    async updateUser({ state, commit }, payload) {
      const { habilitado, sospechoso, requireSurvey, email, password } = payload
      try {
        const resp = await axios.put(`/usuarios/${state.usuario.usuario_id}`, {
          habilitado,
          sospechoso,
          requireSurvey,
          email,
          password,
        })
        console.log(resp)
        router.go(-1)
      } catch (error) {
        console.log(error)
        commit('setError', error)
      }
    },
  },
}
