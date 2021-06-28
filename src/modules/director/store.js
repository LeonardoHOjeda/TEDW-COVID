import axios from 'axios'

export default {
    state: {
        estudiantesRegistrados: {
            cantidad: ''
        },
        estudiantesRegistradosCarrera: {

        },
        medicosRegistrados: {

        },
        cantidadAlertasEnviadas: {
            cantidad: ''
        },
        cantidadOrdenes: '',


    },
    mutations: {
        setEstudiantesRegistrados(state, payload) {
            state.estudiantesRegistrados = payload
        },
        setEstudiantesRegistradosCarrera(state, payload) {
            state.estudiantesRegistradosCarrera = payload
        },
        setMedicosRegistrados(state, payload) {
            state.medicosRegistrados = payload
        },
        setCantidadAlertasEnviadas(state, payload) {
            state.cantidadAlertasEnviadas = payload
        },
    },
    actions: {
        async fetchEstudiantesRegistrados({ commit }) {
            const resp = await axios.get('/estudiantes')
            console.log(resp);
        }
    }
}