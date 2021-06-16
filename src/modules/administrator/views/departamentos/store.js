// State de departamentos
import axios from 'axios'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    departments: [],
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
    setDepartments(state, payload) {
      state.departments = payload
    },
    addDepartment(state, payload) {
      state.departments.push(payload.departamento)
    },
    setSelected(state, payload) {
      const select = state.departments.find(
        (x) => x.departamento_id === payload
      )
      state.selected = select
    },
    updateDepartment(state, payload) {
      state.departments = state.departments.map((x) =>
        x.departamento_id === payload.departamento_id ? payload : x
      )
    },
  },
  actions: {
    async fetchDepartments({ commit }) {
      try {
        const resp = await axios.get('/departamento')
        commit('setDepartments', resp.data)
      } catch (error) {
        commit('setError', error)
        setTimeout(() => commit('setError', null), 4000)
      }
    },

    async deleteDepartment({ state, commit }, payload) {
      try {
        await axios.delete(`/departamento/${payload}`)
        const newDepartments = state.departments.filter(
          (x) => x.departamento_id !== payload
        )
        commit('setDepartments', newDepartments)
      } catch (error) {
        commit('setError', error)
        setTimeout(() => commit('setError', null), 4000)
      }
    },

    async addDepartment({ commit }, payload) {
      try {
        router.go(-1)
        const resp = await axios.post('/departamento', { nombre: payload })
        commit('addDepartment', resp.data)
      } catch (error) {
        console.log(error)
        commit('setError', error)
        setTimeout(() => commit('setError', null), 4000)
      }
    },
    async updateDepartment({ commit }, payload) {
      try {
        router.go(-1)
        const resp = await axios.put(`/departamento/${payload.id}`, {
          nombre: payload.nombre,
        })
        commit('updateDepartment', resp.data)
      } catch (error) {
        console.log(error)
        commit('setError', error)
        setTimeout(() => commit('setError', null), 4000)
      }
    },
  },
  getters: {},
}
