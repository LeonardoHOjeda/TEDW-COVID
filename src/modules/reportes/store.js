import axios from 'axios'

export default {
  namespaced: true,
  state: {
    casosDetectados: {
      estudiantes: [],
      personal: [],
    },
  },
  mutations: {
    setCasosDetectados(state, payload) {
      state.casosDetectados = payload
    },
  },
  actions: {
    async fetchCasosDetectados({ commit }) {
      const resp = await axios.get('/reportes/casos_detectados')
      commit('setCasosDetectados', resp.data)
    },
  },
}
