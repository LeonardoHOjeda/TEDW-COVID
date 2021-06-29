<template>
  <b-container class="mt-3">

    <div>
      <Titulos titulo="Alertas!" subtitulo="En esta seccion podras encontrar las alertas que se encuentran disponibles para ti"/>

      <b-alert
          class="text-center"
          :show="dismissCountDown"
          dismissible
          :variant="mensaje.color"
          @dismissed="dismissCountDown=0"
          @dismiss-count-down="countDownChanged"
        >
          {{mensaje.texto}}
        </b-alert>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Alerta</th>
            <th scope="col">Fecha de alerta</th>
            <th scope="col">Accion</th>
          </tr>
        </thead>
        <tbody>
          <tr :class="item.status === 'pendiente' ? 'bg-danger text-white' : 'table-success'" v-for="(item, index) in alertas" :key="index">
            <th scope="row">{{index+1}}</th>
            <td>{{item.alerta}}</td>
            <td>{{moment(item.create_at).calendar()}}</td>
            <td>
              <b-button :class="item.status !== 'pendiente' ? 'noCheck' : '' " :disabled="item.status !== 'pendiente'" @click="showAlertRead(item.alerta_id)" variant="success">Marcar como leida <b-icon icon="check-all"></b-icon></b-button>
            </td>
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
  </b-container>
</template>

<script>
import Titulos from '../../../components/Titulos.vue'
import moment from 'moment';
import {mapState} from 'vuex'
export default {
  data(){
    return {
      variant: 'danger',
      cargando: true,
      alertas: [],
      moment: moment,
      dismissSecs: 5,
      dismissCountDown: 0,
      mensaje: {
        texto: '',
        color: ''
      }
    }
  },
  components: {
    Titulos,
  },
  computed: {
    ...mapState(['usuario','token'])
  },
  methods: {
    showAlertRead(alerta_id){
      let config = {headers: {'Authorization': `Bearer ${this.token}`}}
      const status = {
        status: 'leida'
      }
      console.log(alerta_id);
      this.$swal({
        title: 'Marcar como leida',
        text: 'El estado pasara a ser leida.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, marcar como leida',
        cancelButtonText: 'No, vamos pa\' tras',
      }).then(res => {
        if(res.isConfirmed){
          this.axios.put(`/alertas/${alerta_id}`, status,config)
            .then((res) => {
            console.log(res);
            this.listarAlertas()
            this.$swal({
                    title: 'Se ha marcado como leido',
                    text: 'La alerta ha sido marcada como leida',
                    icon: 'success'
                  })
          }).catch((err) => {
            console.log(err);
            this.mensaje.texto = `Ha surgido un error: ${err.response.data.statusCode}`
            this.mensaje.color = "danger"
            this.mostrarAlerta()
          });
        }
      })
      
    },
    listarAlertas(){
      let config = {headers: {'Authorization': `Bearer ${this.token}`}}
      this.axios.get(`/alertas/usuario/${this.usuario.usuario_id}`, config)
        .then((res) => {
          this.alertas = []
          this.alertas = res.data
          this.cargando = false
        }).catch((err) => {
          console.log(err.response);
          this.mensaje.texto = `Ha surgido un error: ${err.response.data.statusCode}`
          this.mensaje.color = "danger"
          this.mostrarAlerta()
          this.cargando = false
        });
    },
    mostrarAlerta(){
        this.dismissCountDown = this.dismissSecs
      },
    countDownChanged(dismissCountDown){
      this.dismissCountDown = dismissCountDown
    }
  },
  created(){
    this.listarAlertas()
  }
}
</script>

<style>
  .noCheck{
    cursor: not-allowed;
  }
</style>