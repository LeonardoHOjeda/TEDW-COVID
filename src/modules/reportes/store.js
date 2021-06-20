import axios from 'axios'

export default {
  namespaced: true,
  state: {
    casosDetectados: {
      estudiantes: [],
      personal: [],
    },
    totalCasos: {
      carrera: [],
      departamento: [],
    },
  },
  mutations: {
    setCasosDetectados(state, payload) {
      state.casosDetectados = payload
    },
    setTotalCasos(state, payload) {
      state.totalCasos = payload
    },
  },
  actions: {
    async fetchCasosDetectados({ commit }) {
      const resp = await axios.get('/reportes/casos_detectados')
      commit('setCasosDetectados', resp.data)
    },

    async fetchTotalCasos({ commit }) {
      const resp = await axios.get('/reportes/total_casos')
      commit('setTotalCasos', resp.data)
    },
  },
}
