<template>
  <div class="mt-4">
    <div class="d-flex justify-content-between mb-3">
      <h3 class="m-0">Agregar un Tipo de Prueba</h3>
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="depto">Descripcion del tipo de Prueba</label>
        <b-form-input type="text" class="form-control" id="depto" autofocus v-model="tipo" />
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary">Guardar</button>
      </div>
    </form>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    name: 'AddTipo',
    data: () => ({
      tipo: '',
    }),
    methods: {
      ...mapActions('admin/tipo_prueba', ['addTipo']),
      handleSubmit() {
        this.addTipo(this.tipo);
        this.tipo = '';
      },
    },
  };
</script>

<style>
</style>