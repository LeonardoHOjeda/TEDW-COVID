// State de departamentos
import axios from 'axios'
export default {
  namespaced: true,
  state: {
    departments: [],
    error: null,
  },
  mutations: {
    setError(state, payload) {
      if (payload == null) return (state.error = null)
      state.error = {
        status: payload.response.status,
        message: payload.response.data.message || payload.message,
      }
    },
    setDepartments(state, payload) {
      console.log(payload)
      state.departments = payload
    },
  },
  actions: {
    async fetchDepartments({ commit }) {
      try {
        const resp = await axios.get('/departamento')
        commit('setDepartments', resp.data)
      } catch (error) {
        commit('setError', error)
        setTimeout(() => commit('setError', null), 2000)
      }
    },
  },
  getters: {},
}
