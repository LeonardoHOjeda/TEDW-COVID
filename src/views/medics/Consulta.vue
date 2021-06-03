<template>
  <div>
    <div class="mt-3">
      <b-button href="../" variant="primary"><i class="fas fa-long-arrow-alt-left"></i> Regresar</b-button>
    </div>
    <Titulos titulo="Consulta" subtitulo=""/>
    <h3 class="font-weight-light text-center">Consulta realizada por: alumno</h3>
    <div class="form-group mb-3">
      <h4>Sintomas</h4>
      <textarea class="form-control" cols="90" rows="5" placeholder="Ingresa aqui los sintomas..." readonly></textarea>
      <!-- <div v-if="compruebaLongitud" class="invalid-feedback">
        Escribe un valor valido
      </div> -->
    </div>
    <div class="mb-3">
      <h4>Fotos y/o videos</h4>
    </div>
    <hr>
    
  </div>
</template>

<script>
import Titulos from '../../components/Titulos'
export default {
  components: {
    Titulos
  }
}
</script>

<style>
  textarea{
    resize: none;
  }
</style>