<template>
  <div>
    <h1 class="text-center">Crear Cita</h1>
    <h3 class="font-weight-light">En esta seccion podras solicitar una consulta con un medico, a continuacion deberas de llenar el siguiente formulario</h3>
    <div>
      <form @submit.prevent="procesarFormulario" action="" class="">
        <!-- Sintomas -->
        <div class="form-group mb-3">
          <h4>Sintomas</h4>
          <textarea v-model.trim="cita.textoTextArea" class="form-control" :class="verificarCampo" name="" id="" cols="90" rows="5" placeholder="Ingresa aqui los sintomas..."></textarea>
          <div v-if="compruebaLongitud" class="invalid-feedback">
            Escribe un valor valido
          </div>
        </div>
        <!-- File uploader -->
        <div class="form-group" mb-3>
          <h4 for="exampleFormControlFile1">Subir fotografias/video</h4>
          <input accept="image/*, video/*" type="file" ref="fileupload" class="form-control-file" id="exampleFormControlFile1" multiple>
        </div>

        <div class="my-3">
          <div class="">
            <h4>La cita sobre que modalidad la deseas?</h4>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="modalidad" id="virtual" value="virtual" v-model="cita.modalidad">
              <label class="form-check-label" for="virtual">Virtual</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="modalidad" id="presencial" value="presencial" v-model="cita.modalidad">
              <label class="form-check-label" for="presencial">Presencial</label>
            </div>
          </div>
        </div>
        <!-- Modalidad de la cita -->
        <div class="form-group mb-3">
          <button class="btn btn-success btn-block" type="submit" :disabled="bloquear">Solicitar Cita</button>
        </div>
      </form>
      <p>{{cita}}</p>
    </div>
  </div>
</template>

<script>
// import Pregunta from '../../components/Pregunta'
// import Boton from '../../components/Boton'
export default {
  data() {
    return {
      cita: {
        textoTextArea: '',
        modalidad: ''
      }
    }
  },
  //this.cita.textoTextArea.trim().length <= 2 &&
  components: {
    // Pregunta,
    // Boton
  },
  methods: {
    procesarFormulario(){
      if(this.cita.textoTextArea.trim() === ''){
        console.log('Vacio');
        return
      }
      console.log('No esta vacio');
      console.log(this.cita.modalidad);
      this.$refs.fileupload.value = null;
      this.cita = {
        textoTextArea: '',
        modalidad: ''
      }
    }
  },
  computed: {
    bloquear(){
      if(this.cita.textoTextArea.trim().length > 2 && this.cita.modalidad !== ''){
        return false
      }
        return true
    },
    verificarCampo(){
      if(this.cita.textoTextArea.trim().length === 0){
        return ''
      } else if(this.cita.textoTextArea.trim().length > 0 && this.cita.textoTextArea.trim().length < 3){
        return 'is-invalid'
      } else{
        return 'is-valid'
      }
    },
    compruebaLongitud(){
      return this.cita.textoTextArea.trim().length <= 2 ? true : false;
    }
  }
}
</script>

<style>

</style>