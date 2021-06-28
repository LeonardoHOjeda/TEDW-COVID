// State de departamentos
import axios from 'axios'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    medicos: [],
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
    setMedicos(state, payload) {
      state.medicos = payload
    },
    addMedico(state, payload) {
      state.medicos.push(payload)
    },
    setSelected(state, payload) {
      const select = state.medicos.find((x) => x.medico_id === payload)
      state.selected = select
    },
    updateMedico(state, payload) {
      state.medicos = state.medicos.map((x) => {
        if (x.medico_id === payload.medico_id) {
          payload.usuario = x.usuario
          return payload
        }
        return x
      })
    },
  },
  actions: {
    async fetchMedicos({ commit }) {
      try {
        const resp = await axios.get('/medicos')
        commit('setMedicos', resp.data)
      } catch (error) {
        commit('setError', error)
        setTimeout(() => commit('setError', null), 4000)
      }
    },

    async addMedico({ commit }, payload) {
      try {
        router.go(-1)
        const resp = await axios.post('/medicos/signup', {
          email: payload.email,
          password: 'CONTROL-COVID-2021',
          nombre: payload.nombre,
          a_materno: payload.a_materno,
          a_paterno: payload.a_paterno,
          rfc: payload.rfc,
          cedula: payload.cedula,
        })
        commit('addMedico', resp.data)
      } catch (error) {
        console.log(error.response)
        commit('setError', error)
        setTimeout(() => commit('setError', null), 4000)
      }
    },
    async updateMedico({ commit }, payload) {
      try {
        router.go(-1)
        axios.put(`/medicos/${payload.medico_id}`, {
          nombre: payload.nombre,
          a_materno: payload.a_materno,
          a_paterno: payload.a_paterno,
          rfc: payload.rfc,
          cedula: payload.cedula,
        })
        console.log(payload)
        commit('updateMedico', payload)
      } catch (error) {
        commit('setError', error)
        setTimeout(() => commit('setError', null), 4000)
      }
    },
  },
  getters: {},
}
