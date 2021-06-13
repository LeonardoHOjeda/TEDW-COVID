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
      <div class="d-flex flex-wrap">
        <div v-for="(item, index) in evidencias" :key="index">
          <div v-if="item.url.substr(item.url.length - 3) === 'mp4'" class="mr-4 mb-4">
            <iframe :src="`https://${item.url}`" frameborder="0" allowfullscreen></iframe>
            <br>
              <a class="badge badge-primary" :href="`http://${item.url}`" target="_blank">Link al video <i class="fas fa-video"></i></a>
          </div>
          <div v-else class="mr-4 mb-4">
            <a :href="`${item.url}`" target="_blank">
              <img :src="`${item.url}`" :alt="`${item.url}`">
            </a>
          </div>
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

    <form @submit.prevent="enviaReceta" action="#">
      <!-- Levantar orden -->
        <!-- Anexar el id de usuario y id del medico -->
      <div v-if="checked" class="mb-3">
        <h5>Levantar orden</h5>
        <b-form-select v-model="selected" :options="options"></b-form-select>
      </div>

      <div class="my-3 form-group">
        <h5>Diagnostico</h5>
        <input name="diagnostico" class="form-control" type="text" placeholder="Ingresa aqui el diagnostico..." v-model="diagnostico">
      </div>

      

      <div v-if="cantidadMedicamentos <= 10">
        <div v-for="(medicamento, index) in medicamentos" :key="index" class="mb-3">
          <h5>Medicamento {{index}}</h5>
          <div class="form-group"  >
            <select class="custom-select mb-3" name="medicamento_id" id="" v-model="medicamento.medicamento.medicamento_id">
              <option value="0" disabled selected>--Seleccione Medicina---</option>
              <option v-for="(item, index) in medicinas" :key="index" :value="item.medicamento.medicamento_id">{{item.medicamento.descripcion}}</option>
            </select>
            <input v-model="medicamento.receta" :name="`medicamentos[${index}][receta]`" class="form-control" type="text" :placeholder="'Ingresa aqui las instrucciones del medicamento ' + index">
            <p>{{medicamento}}</p>
          </div>
        </div>
        <div class="d-flex justify-content-around">
          <div class="form-group">
            <button @click="agregaMedicamento" type="button" class="btn btn-info">Agregar medicamento <i class="fas fa-plus-circle"></i></button>
          </div>
          <div class="form-group">
            <button @click="eliminaMedicamento" type="button" class="btn btn-danger">Elimina medicamento <i class="fas fa-minus-circle"></i></button>
          </div>
        </div>
        <b-button variant="success" block type="submit">Enviar receta <i class="fas fa-paper-plane"></i></b-button>
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
import moment from 'moment';
export default {
  components: {
    Titulos,
  },
  data(){
    return{
      modalidad: '',
      moment: moment,
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
      medico_id: '',
      status: 'atendida',
      diagnostico: '',
      medicamentos: [{
        receta: '',
        medicamento: {
          medicamento_id: 1,
        }
      }],
      medicinas: [],
      receta: ''
    }
  },
  computed: {
    ...mapState(['usuario','token']),
  },
  created(){
    this.muestraConsulta(),
    this.muestraMedicamentos()
  },
  methods:{
    muestraConsulta(){
      let config = {headers:{'Authorization': `Bearer ${this.token}`}}
      this.axios.get(`/consultas/${this.$route.params.id}`, config)
        .then((res) => {
          this.modalidad = res.data.modalidad
          this.sintomas = res.data.sintomas
          for (let i = 0; i < res.data.evidencias.length; i++){
            this.evidencias.push({
              url: res.data.evidencias[i].url
            })
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    muestraMedicamentos(){
      let config = {headers:{'Authorization': `Bearer ${this.token}`}}
      this.axios.get('/medicamentos', config)
        .then((res) => {
          for (let i = 0; i < res.data.length; i++){
            this.medicinas.push({
              medicamento: res.data[i]
            })
          }
          console.log(this.medicamentos);
        }).catch((err) => {
          console.log(err);
        });
    },
    agregaMedicamento(){
      this.medicamentos.push({
        receta: '',
        medicamento: {
          medicamento_id: '',
          descripcion: ''
        }
      })
    },
    eliminaMedicamento(){
      this.medicamentos.pop({
        receta: '',
        medicamento: {
          medicamento_id: '',
        }
      })
    },
    enviaReceta(){
      let enviarDatos = {
        medico_id: this.usuario.medico.medico_id,
        status: 'atendida',
        diagnostico: this.diagnostico,
        fecha_atencion: moment().format(),
        medicamentos: []
      }

      let nuevoArreglo = {}
      console.log(this.medicamentos);
      for (let i = 0; i < this.medicamentos.length; i++) {
        enviarDatos.medicamentos.push({
          "receta": this.medicamentos[i].receta,
          "medicamento_id": this.medicamentos[i].medicamento.medicamento_id
        })
        // nuevoArreglo['receta'] = this.medicamentos[i].receta
        // nuevoArreglo['medicamento_id'] = this.medicamentos[i].medicamento.medicamento_id
        // enviarDatos.medicamentos.push(nuevoArreglo)
      }
      console.log(nuevoArreglo);
      console.log(enviarDatos);
      let config = {headers:{'Authorization': `Bearer ${this.token}`}}
      this.axios.put(`/consultas/${this.$route.params.id}`, enviarDatos, config)
        .then((res) => {
          console.log(res);
          this.$swal({
                title: 'Consulta atendida con exito!',
                text: 'Tu consulta ha sido atendida con exito, sigue asi!',
                icon: 'success'
              })
        }).catch((err) => {
          console.log(err.response);
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

  iframe {
    width: 600px;
    height: 400px;
  }
</style>