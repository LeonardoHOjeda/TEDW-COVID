import departments from './views/departamentos/store'
import carreras from './views/carreras/store'
import medicamentos from './views/medicamentos/store'
import tipo_prueba from './views/tipo_prueba/store'
import estudiantes from './views/estudiantes/store'
import personal from './views/personal/store'

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
    estudiantes,
    personal,
  },
}
