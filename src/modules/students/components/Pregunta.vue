<template>
  <div>
    <div class="row">
      <div class="col">
        <h5 for="" class="font-weight-bold">{{pregunta}}</h5>
      </div>
      <div class="col-4 form-check form-check-inline text-center d-flex justify-content-around ">
        <div class="">
          <label class="form-check-label mr-3" :for="idInputYes">{{opcionUno}}</label>
          <!-- <input @click="mandaInformacion" v-model="respuesta" type="radio" class="form-check-input" :name="nameInput" id="si"> -->
          <input @click="mandaInformacion" v-model="respuesta" type="radio" class="form-check-input" :name="nameInput" :id="idInputYes" value="si">
        </div>
        <div>
          <label class="form-check-label mr-3" :for="idInputNo">{{opcionDos}}</label>
          <input @click="mandaInformacion" v-model="respuesta" type="radio" class="form-check-input" :name="nameInput" :id="idInputNo" value="no">
        </div>
      </div><!-- Fin pregunta dos -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pregunta',
  data(){
    return {
      respuesta: '',
      checked: {
        type: Boolean
      }
    }
  },
  props: {
    pregunta: {
      type: String,
      default: 'Pregunta del formulario'
    },
    nameInput: {
      type: String,
      default: 'nameInput'
    },
    idInputYes: {
      type: String,
      default: 'idInput'
    },
    idInputNo: {
      type: String,
      default: 'idInput'
    },
    opcionUno: {
      type: String,
      default: 'Si'
    },
    opcionDos: {
      type: String,
      default: 'No'
    },

  },methods: {
    mandaInformacion(valorSeleccionado){
      this.$emit("obtenerValor", valorSeleccionado.target.value)
    }
  }
}
</script>

<style>

</style>