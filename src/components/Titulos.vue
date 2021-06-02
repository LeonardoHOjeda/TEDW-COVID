<template>
  <div class="mb-4">
    <h1 class="text-center">{{titulo}}</h1>
    <h3 class="font-weight-light text-center">{{subtitulo}}</h3>
  </div>
</template>

<script>
export default {
  name: 'Titulos',
  props: {
    titulo: {
      type: String,
      default: 'Titulo h1'
    },
    subtitulo: {
      type: String,
      default: 'Subtitulo h3'
    },
  }
}
</script>

<style>

</style>