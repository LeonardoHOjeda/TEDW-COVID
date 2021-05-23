<template>
  <div>
    <b-button :variant="variante" :type="tipobtn">{{texto}}</b-button>
  </div>
</template>

<script>
export default {
  name: 'Boton',
  props: {
    variante: {
      type: String,
      default: 'primary'
    },
    texto: {
      type: String,
      default: 'Es correcto'
    },
    tipobtn: {
      type: String,
      default: 'submit'
    }
  }
}
</script>

<style>

</style>