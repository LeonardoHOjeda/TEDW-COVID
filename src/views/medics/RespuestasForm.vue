<template>
  <div>
    <div class="mt-3">
      <b-button href="../Form" variant="primary"><i class="fas fa-long-arrow-alt-left"></i> Regresar</b-button>
    </div>
    <Titulos titulo="Respuestas del formulario " subtitulo=""/>
    <h3 class="font-weight-light text-center">Aqui podras observar las respuestas del formulario con el id: {{$route.params.id}}</h3>
    <h5 class=""> <span class="badge badge-info">Fecha de aplicacion: </span> {{fecha_aplicacion}}</h5>
    <div>
      <h3 class="text-center">Respuestas</h3>
      <div class="" v-for="(item, index) in respuestas" :key="index">
        <h3>{{item.pregunta.pregunta.pregunta}}</h3>
        <h3><span class="text-capitalize badge" :class="item.pregunta.respuesta === 'no' ? 'badge-success' : 'badge-danger'">{{item.pregunta.respuesta}}</span></h3>
        <hr>
      </div>
    </div>
    <h4>Solicitar prueba</h4>
    <b-form-select v-model="selected" :options="options" class="mb-3"></b-form-select>
    <b-button @click="crearOrden" :disabled="block" block variant="danger">Levantar orden <i class="fas fa-viruses"></i></b-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Titulos from '../../components/Titulos'
import moment from 'moment';
export default {
  components: {
    Titulos
  },
  data(){
    return {
      selected: '0',
      moment: moment,
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
      console.log(this.$route.params.id);
      this.axios.get(`/encuesta/${this.$route.params.id}`, config)
        .then((res) => {
          console.log(res);
          let answ = res.data.respuestas
          this.fecha_aplicacion = moment(res.data.fecha_aplicacion).calendar()
          this.usuario_id = res.data.usuario.usuario_id
          for (let i = 0; i < answ.length; i++) {
            this.respuestas.push({
              pregunta: answ[i]
            })
          }
          console.log(this.respuestas);
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