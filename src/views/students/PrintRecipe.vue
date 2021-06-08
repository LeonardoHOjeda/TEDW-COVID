<template>
  <div>
    <Titulos 
      titulo="Historial de recetas"
      subtitulo="En esta seccion podras imprimir las recetas medicas de las consultas que ya fueron atendidas"
      />
      <table class="table table-hover">
        <thead class="thead-light">
          <tr>
            <th scope="col">ID CITA</th>
            <th scope="col">Status</th>
            <th scope="col">Medico</th>
            <th scope="col">Modalidad</th>
            <th scope="col">DESCARGAR RECETA</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in consultas" :key="index">
            <th scope="row">{{item.solicitud_id}}</th>
            <td scope="row">{{item.status}}</td>
            <td v-if="item.medico">{{item.medico.nombre}} {{item.medico.a_paterno}}</td>
            <td v-else>Sin medico</td>
            <td>{{item.modalidad}}</td>
            <!-- <td><a href="">Descargar </a><i class="far fa-file-pdf"></i></td> -->
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
import Titulos from '../../components/Titulos'
import {mapState} from 'vuex'
export default {
  data(){
    return {
      consultas: []
    }
  },
  components: {
    Titulos
  },
  computed: {
    ...mapState(['usuarioDB', 'token'])
  },
  created(){
    this.listarConsultas()
    this.obtenerReceta()
  },
  methods: {
    listarConsultas(){
      // let config = {
      //   header: {
      //     Authorization: `token ${this.token}`
      //   }
      // }
      this.axios.get(`/consultas/usuario/${this.usuarioDB.usuario_id}`, {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      })
        .then(res => {
          console.log(res.data);
          this.consultas = res.data
        })
        .catch(e => {
          console.log(e.response.data.message);
        })
    },
  }
}
</script>

<style>

</style>