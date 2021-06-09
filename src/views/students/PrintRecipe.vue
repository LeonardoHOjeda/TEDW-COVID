<template>
  <div>
    <Titulos 
      titulo="Historial de recetas"
      subtitulo="En esta seccion podras imprimir las recetas medicas de las consultas que ya fueron atendidas"
      />
      <table class="table table-hover">
        <thead class="thead-light">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Fecha solicitud</th>
            <th scope="col">Fecha atencion</th>
            <th scope="col">Status</th>
            <th scope="col">Sintomas</th>
            <th scope="col">Medico</th>
            <th scope="col">Modalidad</th>
            <th scope="col">DESCARGAR RECETA</th>
          </tr>
        </thead>
        <tbody>
          <tr :class="item.medico ? 'table-success' : ''" v-for="(item, index) in consultas" :key="index">
            <th scope="row">{{index+1}}</th>
            <td scope="row">{{moment(item.fecha_solicitud).format('MMMM Do YYYY HH:mm:ss')}}</td>
            <td v-if="item.fecha_atencion" scope="row">{{moment(item.fecha_atencion).format('MMMM Do YYYY HH:mm:ss')}}</td>
            <td v-else>Aun no atendida</td>
            <td scope="row">{{item.status}}</td>
            <td scope="row">{{item.sintomas}}</td>
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
import moment from 'moment';
import {mapState} from 'vuex'
export default {
  data(){
    return {
      consultas: [],
      moment: moment
    }
  },
  components: {
    Titulos
  },
  computed: {
    ...mapState(['usuario', 'token']),
  },
  created(){
    this.listarConsultas()
  },
  methods: {
    listarConsultas(){
      // let config = {
      //   header: {
      //     Authorization: `token ${this.token}`
      //   }
      // }
      this.axios.get(`/consultas/usuario/${this.usuario.usuario_id}`, {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      })
        .then(res => {
          console.log(res.data);
          console.log(this.consultas);
          this.consultas = []
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