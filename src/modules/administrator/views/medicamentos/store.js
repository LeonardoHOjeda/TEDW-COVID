// State de medicamentos
import axios from 'axios'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    medicamentos: [],
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
    setMedicamentos(state, payload) {
      state.medicamentos = payload
    },
    addMedicamento(state, payload) {
      state.medicamentos.push(payload)
    },
    setSelected(state, payload) {
      const select = state.medicamentos.find(
        (x) => x.medicamento_id === payload
      )
      state.selected = select
    },
    updateMedicamento(state, payload) {
      state.medicamentos = state.medicamentos.map((x) =>
        x.medicamento_id === payload.medicamento_id ? payload : x
      )
    },
  },
  actions: {
    async fetchMedicamentos({ commit }) {
      try {
        const resp = await axios.get('/medicamentos')
        commit('setMedicamentos', resp.data)
      } catch (error) {
        commit('setError', error)
        setTimeout(() => commit('setError', null), 4000)
      }
    },

    async deleteMedicamento({ state, commit }, payload) {
      try {
        axios.delete(`/medicamentos/${payload}`)
        const newMedicamentos = state.medicamentos.filter(
          (x) => x.medicamento_id !== payload
        )
        commit('setMedicamentos', newMedicamentos)
      } catch (error) {
        commit('setError', error)
        setTimeout(() => commit('setError', null), 4000)
      }
    },

    async addMedicamento({ commit }, payload) {
      try {
        router.go(-1)
        const resp = await axios.post('/medicamentos', { descripcion: payload })
        commit('addMedicamento', resp.data)
      } catch (error) {
        commit('setError', error)
        setTimeout(() => commit('setError', null), 4000)
      }
    },
    async updateMedicamento({ commit }, payload) {
      try {
        router.go(-1)
        axios.put(`/medicamentos/${payload.medicamento_id}`, {
          descripcion: payload.descripcion,
        })
        commit('updateMedicamento', payload)
      } catch (error) {
        commit('setError', error)
        setTimeout(() => commit('setError', null), 4000)
      }
    },
  },
  getters: {},
}
