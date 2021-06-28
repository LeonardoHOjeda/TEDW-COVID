<template>
  <div class="mb-4">
    <div class="card p-1 shadow-sm">
      <div class="card-body">
        <h2 class="h3">{{titulo}}</h2>
        <h6 class="font-weight-light">{{subtitulo}}</h6>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Titulos',
    props: {
      titulo: {
        type: String,
        default: '',
      },
      subtitulo: {
        type: String,
        default: '',
      },
    },
  };
</script>

<style>
</style>