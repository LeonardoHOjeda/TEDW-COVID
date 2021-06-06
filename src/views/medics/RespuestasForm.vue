<template>
  <div>
    <div class="mt-3">
      <b-button href="../Form" variant="primary"><i class="fas fa-long-arrow-alt-left"></i> Regresar</b-button>
    </div>
    <Titulos titulo="Respuestas del formulario " subtitulo=""/>
    <h3 class="font-weight-light text-center">Aqui podras observar las respuestas del formulario con el id: {{$route.params.id}}</h3>
    <h4>Solicitar prueba</h4>
    <b-form-select v-model="selected" :options="options" class="mb-3"></b-form-select>
    <b-button :disabled="block" block variant="danger">Levantar orden <i class="fas fa-viruses"></i></b-button>
  </div>
</template>

<script>
import Titulos from '../../components/Titulos'
export default {
  components: {
    Titulos
  },
  data(){
    return {
      selected: '0',
      options: [
        {value: '0', text: '---Por favor, selecciona una opcion---', disabled: true},
        {value: '1', text: 'Prueba rapida de sangre'},
        {value: '2', text: 'Prueba rapida de antigeno'},
        {value: '3', text: 'Prueba PCR'}
      ]
    }
  },
  computed: {
    block(){
      if(this.selected === '0'){
        return true
      }
      return false
    }
  }
}
</script>

<style>

</style>