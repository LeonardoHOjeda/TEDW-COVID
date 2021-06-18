// State de departamentos
import axios from 'axios'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    estudiantes: [],
    error: null,
    selected: null,
  },
  mutations: {
    setError(state, payload) {
      if (payload == null) return (state.error = null)
      state.error = {
        status: payload.response.status,
        message: payload.response.data.message || payload.message,
      }
    },
    setEstudiantes(state, payload) {
      state.estudiantes = payload
    },
    addEstudiante(state, payload) {
      state.estudiantes.push(payload)
    },
    setSelected(state, payload) {
      const select = state.estudiantes.find((x) => x.estudiante_id === payload)
      state.selected = select
    },
    updateEstudiante(state, payload) {
      state.estudiantes = state.estudiantes.map((x) =>
        x.estudiante_id === payload.estudiante_id ? payload : x
      )
    },
  },
  actions: {
    async fetchEstudiantes({ commit }) {
      try {
        const resp = await axios.get('/estudiantes')
        commit('setEstudiantes', resp.data)
      } catch (error) {
        commit('setError', error)
        setTimeout(() => commit('setError', null), 4000)
      }
    },

    async deleteEstudiante({ state, commit }, payload) {
      try {
        axios.delete(`/estudiantes/${payload}`)
        const newEstudiantes = state.estudiantes.filter(
          (x) => x.estudiante_id !== payload
        )
        commit('setEstudiantes', newEstudiantes)
      } catch (error) {
        commit('setError', error)
        setTimeout(() => commit('setError', null), 4000)
      }
    },

    async addEstudiante({ commit }, payload) {
      try {
        router.go(-1)
        const resp = await axios.post('/estudiantes/signup', {
          email: payload.email,
          password: 'CONTROL-COVID-2021',
          nombre: payload.nombre,
          a_materno: payload.a_materno,
          a_paterno: payload.a_paterno,
          carrera_id: payload.carrera,
        })
        commit('addEstudiante', resp.data.estudiante)
      } catch (error) {
        console.log(error.response)
        commit('setError', error)
        setTimeout(() => commit('setError', null), 4000)
      }
    },
    async updateEstudiante({ commit }, payload) {
      try {
        router.go(-1)
        const resp = await axios.put(`/estudiantes/${payload.id}`, {
          nombre: payload.nombre,
          a_materno: payload.a_materno,
          a_paterno: payload.a_paterno,
          carrera_id: payload.carrera,
        })
        commit('updateEstudiante', resp.data)
      } catch (error) {
        console.log(error)
        commit('setError', error)
        setTimeout(() => commit('setError', null), 4000)
      }
    },
  },
  getters: {},
}
