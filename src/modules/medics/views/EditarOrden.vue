<template>
  <div class="mt-3">
    <router-link to="/medics/Ordenes" class="btn btn-primary"><i class="fas fa-hand-point-left"></i> Regresar</router-link>
    <Titulos titulo="Editar Orden"  subtitulo="En esta seccion podras editar la orden de un usuario"/>
    <div>
      <b-form-select class="mb-3" v-model="selected" :options="options"></b-form-select>
      <b-button @click="showAlertConfirm()" :disabled="!selected " variant="info" block>Actualizar Orden 
        <i class="fas fa-sync fa-rotate-90"></i>
      </b-button>
    </div>
    <div class="text-center text-info">
      <div class="spinner" v-if="cargando">
        <div class="cube1"></div>
        <div class="cube2"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Titulos from '../../../components/Titulos'
import moment from 'moment';
import router from '../router'
export default {
  data() {
    return {
      cargando: false,
      variant: 'info',
      resultado: '',
      moment: moment,
      selected: null,
        options: [
          { value: null, text: '--Selecciona un resultado--', disabled: true},
          { value: 'POSITIVO', text: 'Positivo' },
          { value: 'NEGATIVO', text: 'Negativo' },
        ]
    }
  },
  components: {
    Titulos,
  },
  methods: {
    showAlertConfirm(){
      this.$swal({
        title: 'Estas seguro?',
        text: 'Una orden actualizada no puede ser modificada',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, actualizar orden',
        cancelButtonText: 'No, vamos pa\' tras',
      }).then(res => {
        if(res.isConfirmed){
          this.cargando = true
          let updateOrden = {
            resultado: this.selected,
            fecha_deteccion: moment(),
            medico: this.usuario.medico.medico_id
          }
          let config = {headers:{'Authorization': `Bearer ${this.token}`}}
          this.axios.put(`/ordenes/${this.$route.params.id}`,updateOrden, config)
            .then((res) => {
              console.log(res);
              this.cargando = false
              this.resultado = ''
              this.$swal({
                title: 'Orden actualizado',
                text: 'Se ha actualizado la orden de manera correcta',
                icon: 'success'
              })
              this.$router.push('/medics/Ordenes');
            }).catch((err) => {
              console.log(err.response)
              this.cargando = false
              this.$swal({
                title: `Ha ocurrido un error | Error Code: ${err.response.data.statusCode}`,
                text: `Mensaje: ${err.response.data.message}`,
                icon: 'error'
              })
            });
        }
      });
      
    },
    actualizarOrden(){
      let config = {headers:{'Authorization': `Bearer ${this.token}`}}
      this.axios.put(`/ordenes/${this.$route.params.id}`,config)
        .then((res) => {
          console.log(res);
        }).catch((err) => {
          console.log(err.response);
        });
    }
  },
  computed: {
    ...mapState(['usuario','token']),
  }
}
</script>

<style>
.spinner {
  margin: 100px auto;
  width: 40px;
  height: 40px;
  position: relative;
}

.cube1, .cube2 {
  background-color: #17a2b8;
  width: 15px;
  height: 15px;
  position: absolute;
  top: 0;
  left: 0;
  
  -webkit-animation: sk-cubemove 1.8s infinite ease-in-out;
  animation: sk-cubemove 1.8s infinite ease-in-out;
}

.cube2 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

@-webkit-keyframes sk-cubemove {
  25% { -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5) }
  50% { -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg) }
  75% { -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5) }
  100% { -webkit-transform: rotate(-360deg) }
}

@keyframes sk-cubemove {
  25% { 
    transform: translateX(42px) rotate(-90deg) scale(0.5);
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  } 50% { 
    transform: translateX(42px) translateY(42px) rotate(-179deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
  } 50.1% { 
    transform: translateX(42px) translateY(42px) rotate(-180deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  } 75% { 
    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
  } 100% { 
    transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
  }
}
</style>