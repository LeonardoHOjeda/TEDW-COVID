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
    totalEncuestas: {
      carrera: [],
      departamento: [],
    },
    totalConsultas: [],
  },
  mutations: {
    setCasosDetectados(state, payload) {
      state.casosDetectados = payload
    },
    setTotalCasos(state, payload) {
      state.totalCasos = payload
    },
    setTotalEncuestas(state, payload) {
      state.totalEncuestas = payload
    },
    setTotalConsultas(state, payload) {
      state.totalConsultas = payload
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

    async fetchTotalEncuestas({ commit }) {
      const resp = await axios.get('/reportes/total_encuestas')
      commit('setTotalEncuestas', resp.data)
    },

    async fetchTotalConsultas({ commit }) {
      const resp = await axios.get('/reportes/total_consultas')
      commit('setTotalConsultas', resp.data.consultas)
    },
  },
}
