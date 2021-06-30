<template>
  <div class="container">
    <div class="mt-3">
      <router-link to="/monitor/Alerta" class="btn btn-primary"><i class="fas fa-long-arrow-alt-left"></i> Regresar</router-link>
    </div>
    <Titulos titulo="Evidencia" subtitulo=""/>
    <h3 class="font-weight-light text-center">Aqui podras observar las evidencias de la orden de analisis con el id: <br>{{$route.params.id}}</h3>
    <br>
    <h5 class=""> <span class="badge badge-info">Fecha de deteccion: </span> {{fecha_deteccion}}</h5>
    <div>
      <div class="mb-3">
        <br>
        <h3>Informaci&oacute;n:</h3>
        <h5><b>Correo del usuario:</b> {{usuario}}</h5>
        <h5><b>Medico a cargo:</b> {{medico}}</h5>
        <h5><b>Tipo de prueba:</b> {{tipo_prueba}}</h5>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Titulos from '../../../components/Titulos'
import moment from 'moment';
export default {
  components: {
    Titulos
  },
  data(){
    return {
      selected: '0',
      moment: moment,
      fecha_deteccion: '',
      usuario: '',
      medico: '',
      tipo_prueba : ''
    }
  },
  computed: {
    ...mapState(['usuario','token']),
  },
  created(){
    this.listar()
  },
  methods: {
    listar(){     
      this.axios.get(`/ordenes/${this.$route.params.id}`)
        .then((res) => {
          this.fecha_deteccion = moment(res.data.fecha_deteccion).calendar()
          this.usuario = res.data.usuario.email
          this.medico = res.data.medico.nombre + " " + res.data.medico.a_paterno + " " + res.data.medico.a_materno
          this.tipo_prueba = res.data.tipo.descripcion
        }).catch((err) => {
          console.log(err.response);
        });
    },
  }
}
</script>

<style>

</style>