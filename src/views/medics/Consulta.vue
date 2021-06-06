<template>
  <div>
    <div class="mt-3">
      <b-button href="../Consultas" variant="primary"><i class="fas fa-long-arrow-alt-left"></i> Regresar</b-button>
    </div>
    <Titulos titulo="Consulta" subtitulo=""/>
    <h3 class="font-weight-light text-center">Consulta realizada por: alumno</h3>
    <div class="mb-3">
      <h4>Modalidad</h4>
      <p>Virtual</p>
    </div>
    <div class="form-group mb-3">
      <h4>Sintomas</h4>
      <textarea class="form-control" cols="90" rows="5" placeholder="Ingresa aqui los sintomas..." readonly></textarea>
    </div>
    <div class="mb-3">
      <h4>Fotos y/o videos</h4>
      <div class="d-flex flex-wrap">
        <div class="mr-4 mb-4">
          <img src="https://www.elagoradiario.com/wp-content/uploads/2020/11/zoonosis-compartir-enfermedades-One-Healh-1-1140x600.jpg" alt="">
        </div>
        <div class="mr-4 mb-4">
          <a href="https://serviciotecnicoiphonedoteu.files.wordpress.com/2016/06/pyrpvsx.jpg?w=620&h=830" target="_blank"><img src="https://serviciotecnicoiphonedoteu.files.wordpress.com/2016/06/pyrpvsx.jpg?w=620&h=830" alt="" class="w-100"></a>
        </div>
          <div class="mr-4 mb-4">
            <iframe src="https://www.microsoft.com/es-es/videoplayer/embed/RWfmWf?pid=ocpVideo0-innerdiv-oneplayer&postJsllMsg=true&maskLevel=20&market=es-es" frameborder="0" allowfullscreen></iframe>
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
      <div v-if="checked">
        <h5>Levantar orden</h5>
        <b-form-select v-model="selected" :options="options" class="mb-3"></b-form-select>
        <b-button :disabled="block" block variant="danger">Levantar orden <i class="fas fa-viruses"></i></b-button>
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
            <select class="custom-select mb-3" name="" id="">
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
export default {
  components: {
    Titulos,
  },
  data(){
    return{
      cantidadMedicamentos: 0,
      checkbox: false,
      selected: '0',
      checked: false,
      options: [
        {value: '0', text: '---Por favor, selecciona una opcion---', disabled: true},
        {value: '1', text: 'Prueba rapida de sangre'},
        {value: '2', text: 'Prueba rapida de antigeno'},
        {value: '3', text: 'Prueba PCR'}
      ]
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