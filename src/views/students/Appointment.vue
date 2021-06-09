<template>
  <div>
    <Titulos 
      titulo="Crear Cita"
      subtitulo="En esta seccion podras solicitar una consulta con un medico, a continuacion deberas de llenar el siguiente formulario"
    />
    <div class="mt-3 text-center">
      <b-alert
        :show="dismissCountDown"
        dismissible
        :variant="mensaje.color"
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="countDownChanged"
      >
        {{mensaje.texto}}
      </b-alert>
    </div>
    <div>
      <form @submit.prevent="procesarFormulario">
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
          <input accept="image/*, video/*" type="file" ref="file" class="form-control-file" id="evidencias" multiple>
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
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// import Pregunta from '../../components/Pregunta'
// import Boton from '../../components/Boton'
import Titulos from '../../components/Titulos'
export default {
  data() {
    return {
      cita: {
        textoTextArea: '',
        modalidad: '',
        evidencias: []
      },
      dismissSecs: 5,
      dismissCountDown: 0,
      mensaje: {
        texto: '',
        color: ''
      }
    }
  },
  components: {
    Titulos
  },
  methods: {
    // onFileChange(e){
    //   console.log(e.target.files.length);
    //   console.log(this.$refs);
    // //   console.log(this.$refs.file.files);
    // //   this.evidencias = []
    // //   let fileList = Array.prototype.slice.call(e.target.files)
    // //   console.log(fileList);
    // //   // fileList.forEach((valor) => {
    // //   //   console.log("Existe el valor "+ valor);
    // //   // });

    // //   // fileList.forEach(f => {
    // //   //   let reader = new FileReader()

    // //   //   reader.onload = function (e){
    // //   //     this.evidencias.push(e.target.result)
    // //   //   }
    // //   //   reader.readAsDataURL(f)
    // //   // })
    // //   // console.log(e.target.files);
    // //   console.log(this.evidencias);
    // },
    procesarFormulario(){
      let formData = new FormData()
      let config = {headers: {'Authorization': `Bearer ${this.token}`}}
      let consultaDatos = {
        usuario_id: JSON.parse(localStorage.getItem('vuex')).usuario.usuario_id,
        sintomas: this.cita.textoTextArea,
        modalidad: this.cita.modalidad,
        evidencias: this.evidencias
      }
      for (let i = 0; i < this.$refs.file.files.length; i++) {
        let file = this.$refs.file.files[i];
        console.log(file);
        formData.append('evidencias', file)
      }
      formData.append('usuario_id', consultaDatos.usuario_id)
      formData.append('sintomas', consultaDatos.sintomas)
      formData.append('modalidad', consultaDatos.modalidad)
    
      console.log(consultaDatos);
      this.axios.post('/consultas', formData, config)
        .then(result => {
          console.log(result)
          this.mensaje.color = 'success'
          this.mensaje.texto = 'Se ha agregado la cita de manera correcta'
          this.mostrarAlerta()
          this.cita = {
            textoTextArea: '',
            modalidad: ''
          }
          this.$refs.file.value = null;
        }).catch((err) => {
          console.log(err.response)
          this.mensaje.color = 'danger'
          this.mensaje.texto = `Error: ${err.response.data.statusCode} -> ${err.response.data.message}`
          this.mostrarAlerta()
          return;
        });
      
      console.log(this.cita.modalidad);
    },
    mostrarAlerta(){
        this.dismissCountDown = this.dismissSecs
      },
    countDownChanged(dismissCountDown){
      this.dismissCountDown = dismissCountDown
    }
  },
  computed: {
    ...mapState(['usuarioDB', 'token']),
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