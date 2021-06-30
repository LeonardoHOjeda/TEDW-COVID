<template>
  <div class="container">
    <div class="mt-3">
      <router-link to="/Monitor/Alerta" class="btn btn-primary"><i class="fas fa-long-arrow-alt-left"></i> Regresar</router-link>
    </div>
    <Titulos titulo="Envio de la alerta" subtitulo=""/>
    <h3 class="font-weight-light text-center">Aqui podra especificar que quiere que se mande junto con la alerta para el usuario: <br> {{usuario}}</h3>
    <div>
      <br>
      <div class="mb-3">
        <h3>Cuerpo</h3>
        <b-form-textarea
          id="textarea"
          v-model="text"
          placeholder="Necesitas ver a un médico inmediatamente"
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </div>
    </div>
    <b-button @click="crearOrden" :disabled="block" block variant="danger">Enviar alerta <i class="far fa-share-square"></i></b-button>
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
      usuario: ''
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
      let config = {headers:{'Authorization': `Bearer ${this.token}`}}
      this.axios.get(`/ordenes/${this.$route.params.orden}`, config)
        .then((res) => {
          this.usuario = res.data.usuario.email;
          this.id = res.data.usuario.usuario_id;
        }).catch((err) => {
          console.log(err.response);
        });
    },
    crearOrden(){
      let enviarDatos = {
        alerta_enviada: true
      }

      let config = {headers:{'Authorization': `Bearer ${this.token}`}}
      this.axios.put(`/ordenes/${this.$route.params.orden}`, enviarDatos, config)
      .then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err.response);
      });

      let alerta = {
        usuario_id: this.id,
        alerta: this.text
      }

      this.axios.post(`/alertas`, alerta, config)
      .then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err.response);
      });

      this.$router.push({
        name: 'Alerta', 
        params: {
          enviado: true
        }
      });
    }
  }
}
</script>

<style>

</style>