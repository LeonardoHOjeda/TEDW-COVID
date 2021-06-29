import axios from 'axios'

export default {
  namespaced: true,
  state: {
    dashboard: null,
  },
  mutations: {
    setDashboard(state, payload) {
      state.dashboard = payload
    },
  },
  actions: {
    async fetchDashboard({ commit }) {
      const resp = await axios.get('/dashboard')
      console.log(resp.data)
      commit('setDashboard', resp.data)
    },
  },
}
