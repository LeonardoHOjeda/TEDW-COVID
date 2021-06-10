<template>
  <div>
    <div class="mt-3">
      <b-button href="../Consultas" variant="primary"><i class="fas fa-long-arrow-alt-left"></i> Regresar</b-button>
    </div>
    <Titulos titulo="Consulta" subtitulo=""/>
    <h3 class="font-weight-light text-center">Consulta realizada por: alumno</h3>
    <div class="mb-3">
      <h4>Modalidad</h4>
      <p class="text-capitalize">{{modalidad}}</p>
    </div>
    <div class="form-group mb-3">
      <h4>Sintomas</h4>
      <textarea v-model="sintomas" class="form-control" cols="90" rows="5" placeholder="Ingresa aqui los sintomas..." readonly></textarea>
    </div>
    <div class="mb-3">
      <h4>Fotos y/o videos</h4>
      <div v-for="(item, index) in evidencias" :key="index" class="d-flex flex-wrap">
        <div v-if="item.url.substr(item.url.length - 3) === 'mp4'" class="mr-4 mb-4">
          <h2>
            <a class="badge badge-primary" :href="`http://${item.url}`" target="_blank">Link al video <i class="fas fa-video"></i></a>
          </h2>
        </div>
        <div v-else class="mr-4 mb-4">
          <a :href="`${item.url}`" target="_blank">
            <img :src="`${item.url}`" :alt="`${item.url}`">
          </a>
        </div>
      </div>
    </div>
    <hr>
    <!-- Inicio seccion medico -->
    <h4>Receta</h4>
    <!-- Inicio Formulario -->
    <h5 :class="checked ? 'text-danger' : ''">Sospechoso</h5>
    <div>
      <b-form-checkbox v-model="checked" name="check-button" switch>
        <p v-if="checked" class="text-danger">Si</p>
        <p class="text-success" v-else>No</p>
      </b-form-checkbox>
    </div>
    <form action="#"> <!--Falta agregar la accion del submit-->

      <!-- Levantar orden -->
        <!-- Anexar el id de usuario y id del medico -->
      <div v-if="checked" class="mb-3">
        <h5>Levantar orden</h5>
        <b-form-select v-model="selected" :options="options"></b-form-select>
        <!-- <b-button :disabled="block" block variant="danger">Levantar orden <i class="fas fa-viruses"></i></b-button> -->
      </div>

      <div class="my-3 form-group">
        <h5>Diagnostico</h5>
        <input class="form-control" type="text" placeholder="Ingresa aqui el diagnostico...">
      </div>

      <div class="form-group">
        <label class="badge badge-primary py-2 mr-2" for="cantidadMedicinas">Numero de medicamentos</label>
        <input type="number" id="cantidadMedicinas" name="cantidadMedicinas" min="0" max="10" v-model.number="cantidadMedicamentos">
      </div>

      <div v-if="cantidadMedicamentos <= 10">
        <div v-for="index in cantidadMedicamentos" :key="index" class="mb-3">
          <h5>Medicamento {{index}}</h5>
          <div class="form-group">
            <select class="custom-select mb-3" name="medicamento_id" id="">
              <option value="0" disabled>--Seleccione Medicina---</option>
              <option value="">Medicina 1</option>
              <option value="">Medicina 2</option>
              <option value="">Medicina 3</option>
            </select>
            <input :name="'medicamento_' + index" class="form-control" type="text" :placeholder="'Ingresa aqui las instrucciones del medicamento ' + index">
          </div>
        </div>
        <b-button variant="success" block>Enviar receta <i class="fas fa-paper-plane"></i></b-button>
      </div>
      <div v-else class="alert alert-danger" role="alert">
        El numero de medicamentos no puede ser MAYOR a 10
      </div>
    </form> 
    <!-- Fin formulario -->
  </div>
</template>

<script>
import Titulos from '../../components/Titulos'
import {mapState} from 'vuex'
export default {
  components: {
    Titulos,
  },
  data(){
    return{
      modalidad: '',
      sintomas: '',
      cantidadMedicamentos: 0,
      evidencias: [],
      checkbox: false,
      selected: '0',
      checked: false,
      options: [
        {value: '0', text: '---Por favor, selecciona una opcion---', disabled: true},
        {value: '1', text: 'Prueba rapida de sangre'},
        {value: '2', text: 'Prueba rapida de antigeno'},
        {value: '3', text: 'Prueba PCR'}
      ],
      playerOptions: {
        // videojs options
          muted: true,
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: "video/mp4",
            src: "nyc3.digitaloceanspaces.com/covid19-itc/1623270161527.mp4"
          }],
      }
    }
  },
  computed: {
    ...mapState(['usuario','token']),
  },
  created(){
    this.muestraConsulta()
  },
  methods:{
    muestraConsulta(){
      
      let config = {headers:{'Authorization': `Bearer ${this.token}`}}
      this.axios.get(`/consultas/${this.$route.params.id}`, config)
        .then((res) => {
          console.log(res);
          console.log(res.data.evidencias);
          this.modalidad = res.data.modalidad
          this.sintomas = res.data.sintomas
          console.warn(res.data.evidencias.length);
          for (let i = 0; i < res.data.evidencias.length; i++){
            this.evidencias.push({
              url: res.data.evidencias[i].url
            })
          }
          console.log(res.data.evidencias[0].url);
          console.log(this.evidencias[0].url['type']);
        }).catch((err) => {
          console.log(err);
        });
    }
  }
}
</script>

<style>
  textarea{
    resize: none;
  }
  img{
    width: auto;
    max-width: 250px;
    max-height: 500px;
  }
  iframe{
    width: 500px;
    height: 350px;
  }
</style>