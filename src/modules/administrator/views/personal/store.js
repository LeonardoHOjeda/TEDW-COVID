// State de departamentos
import axios from 'axios'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    personal: [],
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
    setPersonal(state, payload) {
      state.personal = payload
    },
    addPersonal(state, payload) {
      state.personal.push(payload)
    },
    setSelected(state, payload) {
      const select = state.personal.find((x) => x.personal_id === payload)
      state.selected = select
    },
    updatePersonal(state, payload) {
      state.personal = state.personal.map((x) => {
        if (x.personal_id === payload.personal_id) {
          payload.usuario = x.usuario
          return payload
        }
        return x
      })
    },
  },
  actions: {
    async fetchPersonal({ commit }) {
      try {
        const resp = await axios.get('/personal')
        commit('setPersonal', resp.data)
      } catch (error) {
        commit('setError', error)
        setTimeout(() => commit('setError', null), 4000)
      }
    },

    async addPersonal({ commit }, payload) {
      try {
        router.go(-1)
        const resp = await axios.post('/personal/signup', {
          email: payload.email,
          password: 'CONTROL-COVID-2021',
          nombre: payload.nombre,
          a_materno: payload.a_materno,
          a_paterno: payload.a_paterno,
          departamento_id: payload.departamento,
          rfc: payload.rfc,
        })
        commit('addPersonal', resp.data.saved)
      } catch (error) {
        console.log(error.response)
        commit('setError', error)
        setTimeout(() => commit('setError', null), 4000)
      }
    },
    async updatePersonal({ commit }, payload) {
      try {
        router.go(-1)
        const resp = await axios.put(`/personal/${payload.id}`, {
          nombre: payload.nombre,
          a_materno: payload.a_materno,
          a_paterno: payload.a_paterno,
          departamento_id: payload.departamento,
          rfc: payload.rfc,
        })
        commit('updatePersonal', resp.data)
      } catch (error) {
        console.log(error)
        commit('setError', error)
        setTimeout(() => commit('setError', null), 4000)
      }
    },
  },
  getters: {},
}
