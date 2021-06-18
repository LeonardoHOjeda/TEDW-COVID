// State de tipos de prueba
import axios from 'axios'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    tipos: [],
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
    setTipos(state, payload) {
      state.tipos = payload
    },
    addTipo(state, payload) {
      state.tipos.push(payload)
    },
    setSelected(state, payload) {
      const select = state.tipos.find(
        (x) => x.tipo_id === payload
      )
      state.selected = select
    },
    updateTipo(state, payload) {
      state.tipos = state.tipos.map((x) =>
        x.tipo_id === payload.tipo_id ? payload : x
      )
      state.selected = null
    },
  },
  actions: {
    async fetchTipos({ commit }) {
      try {
        const resp = await axios.get('/tipo_prueba')
        console.log(resp);
        commit('setTipos', resp.data)
      } catch (error) {
        commit('setError', error)
        setTimeout(() => commit('setError', null), 4000)
      }
    },

    async deleteTipo({ state, commit }, payload) {
      try {
        axios.delete(`/tipo_prueba/${payload}`)
        const newTipos = state.tipos.filter(
          (x) => x.tipo_id !== payload
        )
        commit('setTipos', newTipos)
      } catch (error) {
        commit('setError', error)
        setTimeout(() => commit('setError', null), 4000)
      }
    },

    async addTipo({ commit }, payload) {
      try {
        router.go(-1)
        const resp = await axios.post('/tipo_prueba', { descripcion: payload })
        commit('addTipo', resp.data)
      } catch (error) {
        commit('setError', error)
        setTimeout(() => commit('setError', null), 4000)
      }
    },
    async updateTipo({ commit }, payload) {
      try {
        router.go(-1)
        axios.put(`/tipo_prueba/${payload.tipo_id}`, {
          descripcion: payload.descripcion,
        })
        commit('updateTipo', payload)
      } catch (error) {
        commit('setError', error)
        setTimeout(() => commit('setError', null), 4000)
      }
    },
  },
  getters: {},
}
