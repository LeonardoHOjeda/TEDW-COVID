<template>
  <div>
    <div class="mt-3">
      <router-link to="../Consultas" class="btn btn-primary"><i class="fas fa-long-arrow-alt-left"></i> Regresar</router-link>
    </div>
    <div class="mt-3 text-center alert alert-danger" v-if="mensaje != ''">
      <p>{{mensaje}}</p>
    </div>
    <Titulos titulo="Consulta" subtitulo=""/>
    <h3 class="font-weight-light text-center">Consulta realizada por: {{alumno}}</h3>
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
    <h5 :class="sospechoso ? 'text-danger' : ''">Sospechoso</h5>
    <div>
      <b-form-checkbox v-model="sospechoso" name="check-button" switch>
        <p v-if="sospechoso" class="text-danger">Si</p>
        <p class="text-success" v-else>No</p>
      </b-form-checkbox>
    </div>

    <form @submit.prevent="enviaReceta" action="#">
      <!-- Levantar orden -->
        <!-- Anexar el id de usuario y id del medico -->
      <div v-if="sospechoso" class="mb-3">
        <h5>Levantar orden</h5>
        <b-form-select v-model="selected" :options="options"></b-form-select>
        <p>{{selected}}</p>
      </div>

      <div class="my-3 form-group">
        <h5>Diagnostico</h5>
        <input name="diagnostico" class="form-control" type="text" placeholder="Ingresa aqui el diagnostico..." v-model="diagnostico">
      </div>

      

      <div v-if="cantidadMedicamentos <= 10">
        <div v-for="(medicamento, index) in medicamentos" :key="index" class="mb-3">
          <h5>Medicamento {{index+1}}</h5>
          <div class="form-group"  >
            <select class="custom-select mb-3" name="medicamento_id" id="" v-model="medicamento.medicamento.medicamento_id">
              <option value="0" disabled selected>--Seleccione Medicina---</option>
              <option v-for="(item, index) in medicinas" :key="index" :value="item.medicamento.medicamento_id">{{item.medicamento.descripcion}}</option>
            </select>
            <input v-model="medicamento.receta" :name="`medicamentos[${index}][receta]`" class="form-control" type="text" :placeholder="'Ingresa aqui las instrucciones del medicamento ' + (index+1)">
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
import Titulos from '../../../components/Titulos'
import {mapState} from 'vuex'
import moment from 'moment';
export default {
  components: {
    Titulos,
  },
  data(){
    return{
      mensaje: '',
      modalidad: '',
      moment: moment,
      sintomas: '',
      cantidadMedicamentos: 0,
      evidencias: [],
      checkbox: false,
      selected: '0',
      sospechoso: false,
      options: [
        {value: '0', text: '---Por favor, selecciona una opcion---', disabled: true},
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
      receta: '',
      alumno: '',
      usuario_id: ''
    }
  },
  computed: {
    ...mapState(['usuario','token']),
  },
  async created(){
    await this.muestraConsulta();
    await this.muestraMedicamentos();
    await this.muestraTiposPrueba();
  },
  methods:{
    // Muestra los datos de la consulta
    async muestraConsulta(){
      let config = {headers:{'Authorization': `Bearer ${this.token}`}}
      // obten todos los datos de la consulta
      const res = await this.axios.get(`/consultas/${this.$route.params.id}`, config)
        this.modalidad = res.data.modalidad
        this.sintomas = res.data.sintomas
        this.alumno = res.data.usuario.email
        this.usuario_id = res.data.usuario.usuario_id
        for (let i = 0; i < res.data.evidencias.length; i++){
          this.evidencias.push({
            url: res.data.evidencias[i].url
          })
        }
      // Obten todos los tipos de prueba
    },

    // Obten todos los medicamentos de la BD
    async muestraMedicamentos(){
      let config = {headers:{'Authorization': `Bearer ${this.token}`}}
      const res = await this.axios.get('/medicamentos', config)
        for (let i = 0; i < res.data.length; i++){
          this.medicinas.push({
            medicamento: res.data[i]
          })
        }
    },

    //Obten todos los tipos de pruebas de la BD
    async muestraTiposPrueba(){
      let config = {headers:{'Authorization': `Bearer ${this.token}`}}
      const res = await this.axios.get('/tipo_prueba', config)
        for (let i = 0; i < res.data.length; i++){
          this.options.push({
            value: res.data[i].tipo_id,
            text: res.data[i].descripcion
          })
        }
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
      for (let i = 0; i < this.medicamentos.length; i++) {
        enviarDatos.medicamentos.push({
          "receta": this.medicamentos[i].receta,
          "medicamento_id": this.medicamentos[i].medicamento.medicamento_id
        })
      }
      let config = {headers:{'Authorization': `Bearer ${this.token}`}}

      // Envia la receta y actualiza el estatus a 'atendida'
      this.axios.put(`/consultas/${this.$route.params.id}`, enviarDatos, config)
        .then((res) => {
          this.$swal({
                title: 'Consulta atendida con exito!',
                text: 'Tu consulta ha sido atendida con exito, sigue asi!',
                icon: 'success'
              })
        }).catch((err) => {
          console.log(err.response);
        });
      if(this.selected !== '0'){
        let orden = {
          usuario_id: this.usuario_id,
          medico_id: this.usuario.medico.medico_id,
          tipo_id: this.selected
        }
        this.axios.post('/ordenes', orden, config)
          .then((res) => {
            this.selected = '0'
          }).catch((err) => {
            console.log(err.response);
          });
      }
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