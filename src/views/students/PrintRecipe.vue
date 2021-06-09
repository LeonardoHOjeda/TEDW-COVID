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
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr :class="item.medico ? 'table-success' : ''" v-for="(item, index) in consultas" :key="index">
            <th scope="row">{{index+1}}</th>
            <td scope="row">{{moment(item.fecha_solicitud).calendar()}}</td>
            <td v-if="item.fecha_atencion" scope="row">{{moment(item.fecha_atencion).calendar()}}</td>
            <td v-else>Aun no atendida</td>
            <td scope="row">{{item.status}}</td>
            <td scope="row">{{item.sintomas}}</td>
            <td v-if="item.medico">{{item.medico.nombre}} {{item.medico.a_paterno}}</td>
            <td v-else>Sin medico</td>
            <td>{{item.modalidad}}</td>
            <td v-if="item.medico">
              <a :href="`http://localhost:3000/consultas/receta/${item.solicitud_id}?token=${token}`" target="_blank">Descargar Receta <i class="fas fa-file-pdf"></i></a>
            </td>
            <td v-else>No hay receta disponible <i class="fas fa-window-close"></i></td>
            <td>
              <b-button @click="showAlertDelete(item.solicitud_id)" :class="item.status === 'atendida' ? 'noDelete' : ''" variant="danger" :disabled="item.status === 'atendida'">Eliminar consulta <i class="fas fa-trash-alt"></i></b-button>
            </td>
            <!-- <td><a href="">Descargar </a><i class="far fa-file-pdf"></i></td> -->
          </tr>
        </tbody>
      </table>
      <div class="text-center">
          <b-spinner
          :variant="variant"
          :key="variant"
          v-if="cargando"
          ></b-spinner>
      </div>
  </div>
</template>

<script>
import Titulos from '../../components/Titulos'
import moment from 'moment';
import {mapState} from 'vuex'
export default {
  data(){
    return {
      variant: 'info',
      cargando: true,
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
    showAlertDelete(solicitud_id){
      console.log(solicitud_id);
      this.$swal({
        title: 'Estas seguro?',
        text: 'Una consulta borrada no puede ser recuperada',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar consulta',
        cancelButtonText: 'No, vamos pa\' tras',
      }).then(res => {
        if(res.isConfirmed){
          this.axios.delete(`/consultas/${solicitud_id}`, {
              headers: {
                'Authorization': `Bearer ${this.token}`
              }
            })
            .then((res) => {
              console.log(res);
              const consultasNuevo = this.consultas.filter(item => item.solicitud_id !== solicitud_id)
              console.log(consultasNuevo);
              // const index = this.consultas.findIndex(item => item.solicitud_id === res.data.solicitud_id)
              // this.consultas.splice(index,1)
              this.consultas = consultasNuevo
              this.$swal({
                title: 'Consulta eliminada',
                text: 'Tu consulta ha sido eliminada con exito',
                icon: 'success'
              })
            }).catch((err) => {
              this.$swal({
                title: `Ha ocurrido un error | Error Code: ${err.response.data.statusCode}`,
                text: `Mensaje: ${err.response.data.message}`,
                icon: 'error'
              })
            });
          
          
        }
      });
    },
    listarConsultas(){
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
          this.cargando = false
        })
        .catch(e => {
          console.log(e.response.data.message);
        })
    },
  }
}
</script>

<style>
.noDelete{
  cursor: not-allowed;
}
</style>