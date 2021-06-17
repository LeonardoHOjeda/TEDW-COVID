import departments from './views/departamentos/store'
import carreras from './views/carreras/store'
import medicamentos from './views/medicamentos/store'
import tipo_prueba from './views/tipo_prueba/store'

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    departments,
    carreras,
    medicamentos,
    tipo_prueba,
  },
}
