<template>
  <b-container class="mt-3">
    
    <div>
      <Titulos 
        titulo="Encuesta COVID-19"
        subtitulo="Contesta la siguiente encuesta, evita mentir, esto es para protegernos a TODOS"
      />
      <!-- Seccion del formulario -->
      <form @submit.prevent="submit" class="mt-5">
        <div class="container">
          <hr>
          <!-- Pregunta 1 -->
          <Pregunta pregunta="Pregunta #1: ¿Siente fiebre, escalofrios como los de una gripe o una fiebre con una temperatura tomada por la boca de 38.1˚ C (100.6˚F) o más?" nameInput="pregunta1" idInputYes="Si1"  idInputNo="No1" @obtenerValor="inputSelected"/>
          <hr>
          <!-- Pregunta 2 -->
          <Pregunta pregunta="Pregunta #2: ¿Ha tenido una pérdida repentina del olfato sin congestión nasal (nariz tapada), con o sin pérdida del gusto?" nameInput="pregunta2" idInputYes="Si2"  idInputNo="No2" @obtenerValor="inputSelected"/>
          <hr>
          <!-- Pregunta 3 -->
          <Pregunta pregunta="Pregunta #3: ¿Ha desarrollado una tos o su tos crónica ha empeorado recientemente?" nameInput="pregunta3" idInputYes="Si3"  idInputNo="No3" @obtenerValor="inputSelected"/>
          <hr>
          <!-- Pregunta 4 -->
          <Pregunta pregunta="Pregunta #4: ¿Tiene problemas al respirar o le falta el aliento?" nameInput="pregunta4" idInputYes="Si4"  idInputNo="No4" @obtenerValor="inputSelected"/>
          <hr>
          <!-- Pregunta 5 -->
          <Pregunta pregunta="Pregunta #5: ¿Tiene dolor de garganta?" nameInput="pregunta5" idInputYes="Si5"  idInputNo="No5" @obtenerValor="inputSelected"/>
          <hr>
          <!-- Pregunta 6 -->
          <Pregunta pregunta="Pregunta #6: ¿Tiene secreción o congestión nasal de causa desconocida?" nameInput="pregunta6" idInputYes="Si6"  idInputNo="No6" @obtenerValor="inputSelected"/>
          <hr>
          <!-- Pregunta 7: 2 o más == retiro inmediato de la institución -->
          <Pregunta pregunta="Pregunta #7: ¿Tiene dolor de estómago?" nameInput="pregunta7" idInputYes="Si7"  idInputNo="No7" @obtenerValor="inputSelected"/>
          <hr>
          <!-- Pregunta 8 -->
          <Pregunta pregunta="Pregunta #8: ¿Tiene náuseas o vómitos?" nameInput="pregunta8" idInputYes="Si8"  idInputNo="No8" @obtenerValor="inputSelected"/>
          <hr>
          <!-- Pregunta 9 -->
          <Pregunta pregunta="Pregunta #9: ¿Tiene diarrea?" nameInput="pregunta9" idInputYes="Si9"  idInputNo="No9" @obtenerValor="inputSelected"/>
          <hr>
          <!-- Pregunta 10 -->
          <Pregunta pregunta="Pregunta #10: ¿Tiene fatiga inusualmente intesa sin razón obvia?" nameInput="pregunta10" idInputYes="Si10"  idInputNo="No10" @obtenerValor="inputSelected"/>
          <hr>
          <!-- Pregunta 11 -->
          <Pregunta pregunta="Pregunta #11: ¿Tiene pérdida sígnificativa de apetito?" nameInput="pregunta11" idInputYes="Si11"  idInputNo="No11" @obtenerValor="inputSelected"/>
          <hr>
          <!-- Pregunta 12 -->
          <Pregunta pregunta="Pregunta #12: ¿Tiene dolores musculares generalizados inusuales o sin razón obvia? (No relacionado con el esfuerzo físíco)" nameInput="pregunta12" idInputYes="Si12"  idInputNo="No12" @obtenerValor="inputSelected"/>
          <hr>
          <!-- Pregunta 13 -->
          <Pregunta pregunta="Pregunta #13: ¿Tiene dolor de cabeza inhabitual?" nameInput="pregunta13" idInputYes="Si13"  idInputNo="No13" @obtenerValor="inputSelected"/>
          <hr>
          <!-- Otros sintomas -->
          <div class="row mb-3">
            <div class="col">
              <h5 class="font-weight-bold">Describa si tiene otros síntomas:</h5>
            </div>
            <div class="col-4 form-check form-check-inline text-center d-flex justify-content-around">
              <textarea style="resize: none;" class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="otros_sintomas"></textarea>
            </div>
          </div>
          
        </div><!-- Fin de las preguntas -->
        <b-alert
          :show="dismissCountDown"
          dismissible
          :variant="mensaje.color"
          @dismissed="dismissCountDown=0"
          @dismiss-count-down="countDownChanged"
          class="text-uppercase font-weight-bold text-center"
        >
          {{mensaje.texto}}
        </b-alert>
        <div class="mt-3 text-center">
          <b-spinner
            :variant="variant"
            :key="variant"
            v-if="cargando"
            class=""
            ></b-spinner>
        </div>
        <div class="my-5 text-center">
          <b-button variant="primary" block type="submit">Enviar formulario <i class="fas fa-poll-h"></i></b-button>
        </div>
      </form>
      
    </div>
  </b-container>
</template>

<script>
import { mapState } from 'vuex';
import Pregunta from '../components/Pregunta'
import Titulos from '../../../components/Titulos'
export default {
  name: 'Form',
  data() {
    return {
      variant: 'primary',
      cargando: false,
      dismissSecs: 5,
      dismissCountDown: 0,
      mensaje: {
        texto: '',
        color: ''
      },
      respuestas: [],
      otros_sintomas: ''
    }
  },
  components: {
    Pregunta,
    Titulos
  },
  computed: {
    ...mapState(['usuario', 'token']),
  },
  methods:{
    submit(){
      this.cargando = true
      let config = {headers: {'Authorization': `Bearer ${this.token}`}}
      let respuestaFormulario = {usuario_id: this.usuario.usuario_id,otros_sintomas: this.otros_sintomas,respuestas: this.respuestas}

      this.axios.post('/encuesta', respuestaFormulario, config)
        .then(result => {
          console.log(result)
          this.mensaje.color = 'success'
          this.mensaje.texto = 'El formulario se ha contestado de manera correcta'
          this.mostrarAlerta()
          this.cargando = false
          setTimeout(() => {
            this.$router.push('/');
          }, 1000);
        }).catch((err) => {
          console.log(err.response)
          this.mensaje.color = 'danger'
          this.mensaje.texto = `Error: ${err.response.data.statusCode}: ${err.response.data.message}`
          this.mostrarAlerta()
          this.cargando = false
          return;
        });
        console.log(respuestaFormulario);
    },
    inputSelected(selectedInput){
      this.respuestas.push(selectedInput)
    },
    mostrarAlerta(){
        this.dismissCountDown = this.dismissSecs
      },
    countDownChanged(dismissCountDown){
      this.dismissCountDown = dismissCountDown
    }
  }
}
</script>

<style>

</style>