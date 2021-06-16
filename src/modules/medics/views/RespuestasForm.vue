<template>
  <div>
    <div class="mt-3">
      <router-link to="/medics/Form" class="btn btn-primary"><i class="fas fa-long-arrow-alt-left"></i> Regresar</router-link>
    </div>
    <Titulos titulo="Respuestas del formulario " subtitulo=""/>
    <h3 class="font-weight-light text-center">Aqui podras observar las respuestas del formulario con el id: {{$route.params.id}}</h3>
    <h5 class=""> <span class="badge badge-info">Fecha de aplicacion: </span> {{fecha_aplicacion}}</h5>
    <div>
      <h3 class="text-center">Respuestas</h3>
      <div class="" v-for="(item, index) in respuestas" :key="index">
        <h5>{{item.pregunta.pregunta.pregunta}}</h5>
        <h5><span class="text-capitalize badge" :class="item.pregunta.respuesta === 'no' ? 'badge-success' : 'badge-danger'">{{item.pregunta.respuesta}}</span></h5>
        <hr>
      </div>
      <div class="mb-3">
        <h3>Otros sintomas</h3>
        <b-form-textarea
          id="textarea"
          v-model="text"
          placeholder="No hay sintomas agregados :c"
          rows="3"
          max-rows="6"
          readonly
        ></b-form-textarea>
      </div>
    </div>
    <h4>Solicitar prueba</h4>
    <b-form-select v-model="selected" :options="options" class="mb-3"></b-form-select>
    <b-button @click="crearOrden" :disabled="block" block variant="danger">Levantar orden <i class="fas fa-viruses"></i></b-button>
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
      text: '',
      options: [
        {value: '0', text: '---Por favor, selecciona una opcion---', disabled: true},
        {value: '1', text: 'Prueba PCR'},
        {value: '2', text: 'Prueba rapida de antigeno'},
        {value: '3', text: 'Prueba rapida de sangre'}
      ],
      fecha_aplicacion: '',
      respuestas: [],
      usuario_id: ''
    }
  },
  computed: {
    ...mapState(['usuario','token']),
    block(){
      if(this.selected === '0'){
        return true
      }
      return false
    }
  },
  created(){
    this.listarRespuestas()
  },
  methods: {
    listarRespuestas(){
      let config = {headers:{'Authorization': `Bearer ${this.token}`}}
      this.axios.get(`/encuesta/${this.$route.params.id}`, config)
        .then((res) => {
          let answ = res.data.respuestas
          this.fecha_aplicacion = moment(res.data.fecha_aplicacion).calendar()
          this.usuario_id = res.data.usuario.usuario_id
          this.text = res.data.otros_sintomas
          for (let i = 0; i < answ.length; i++) {
            this.respuestas.push({
              pregunta: answ[i]
            })
          }
        }).catch((err) => {
          console.log(err.response);
        });

    },
    crearOrden(){
      console.log(this.selected);
      let config = {headers:{'Authorization': `Bearer ${this.token}`}}
      let orden = {
        usuario_id: this.usuario_id,
        medico_id: this.usuario.medico.medico_id,
        tipo_id: this.selected
      }
      this.axios.post('/ordenes', orden, config)
        .then((res) => {
          console.log(res);
          this.$swal({
                title: 'Orden levantada',
                text: 'La orden ha sido levantada con exito',
                icon: 'success'
              })
          this.selected = '0'
        }).catch((err) => {
          console.log(err.response);
        });
    }
  }
}
</script>

<style>

</style>