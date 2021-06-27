import departments from './views/departamentos/store'
import carreras from './views/carreras/store'
import medicamentos from './views/medicamentos/store'
import tipo_prueba from './views/tipo_prueba/store'
import estudiantes from './views/estudiantes/store'
import personal from './views/personal/store'
import medicos from './views/medicos/store'
import usuarios from './views/usuarios/store'

import axios from 'axios'

export default {
  namespaced: true,
  state: {
    modalidad: 'obligatoria',
  },
  mutations: {
    setModalidad(state, payload) {
      state.modalidad = payload
    },
  },
  actions: {
    async getModalidad({ commit }) {
      try {
        const resp = await axios.get('/encuesta/modalidad')
        commit('setModalidad', resp.data.modalidad)
      } catch (error) {
        console.log(error)
      }
    },

    changeModalidad({ commit }, payload) {
      try {
        axios.post('/encuesta/modalidad', {
          modalidad: payload.modalidad,
        })
        commit('setModalidad', payload.modalidad)
      } catch (error) {
        console.log(error)
      }
    },
  },
  getters: {},
  modules: {
    departments,
    carreras,
    medicamentos,
    tipo_prueba,
    estudiantes,
    personal,
    medicos,
    usuarios,
  },
}
