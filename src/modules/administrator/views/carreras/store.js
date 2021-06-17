// State de carreras
import axios from 'axios'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    carreras: [],
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
    setCarreras(state, payload) {
      state.carreras = payload
    },
    addCarrera(state, payload) {
      console.log(payload)
      const newCarrer = {
        carrera: payload.carrera.nombre,
        carrera_id: payload.carrera.carrera_id,
        departamento: payload.carrera.departamento,
      }
      console.log(newCarrer)
      state.carreras.push(payload.carrera)
    },
    setSelected(state, payload) {
      const select = state.carreras.find((x) => x.carrera_id === payload)
      state.selected = select
    },
    updateCarrera(state, payload) {
      state.carreras = state.carreras.map((x) =>
        x.carrera_id === payload.carrera_id ? payload : x
      )
    },
  },
  actions: {
    async fetchCarreras({ commit }) {
      try {
        const resp = await axios.get('/carrera')
        commit('setCarreras', resp.data)
      } catch (error) {
        commit('setError', error)
        setTimeout(() => commit('setError', null), 4000)
      }
    },

    async deleteCarrera({ state, commit }, payload) {
      try {
        axios.delete(`/carrera/${payload}`)
        const newCarreras = state.carreras.filter(
          (x) => x.carrera_id !== payload
        )
        commit('setCarreras', newCarreras)
      } catch (error) {
        commit('setError', error)
        setTimeout(() => commit('setError', null), 4000)
      }
    },

    async addCarrera({ commit }, payload) {
      try {
        router.go(-1)
        const resp = await axios.post('/carrera', {
          nombre: payload.nombre,
          departamento_id: payload.departamento_id,
        })
        commit('addCarrera', resp.data)
      } catch (error) {
        console.log(error)
        commit('setError', error)
        setTimeout(() => commit('setError', null), 4000)
      }
    },
    async updateCarrera({ commit }, payload) {
      try {
        router.go(-1)
        const resp = await axios.put(`/carrera/${payload.id}`, {
          nombre: payload.nombre,
          departamento_id: payload.departamento_id,
        })
        commit('updateCarrera', resp.data)
      } catch (error) {
        console.log(error)
        commit('setError', error)
        setTimeout(() => commit('setError', null), 4000)
      }
    },
  },
  getters: {},
}
