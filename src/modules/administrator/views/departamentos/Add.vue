<template>
  <b-container class="mt-4">
    <div class="d-flex justify-content-between mb-3">
      <h3 class="m-0">Agregar departamento</h3>
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="depto">Nombre del departamento</label>
        <b-form-input type="text" class="form-control" id="depto" autofocus v-model="departamento" />
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary">Guardar</button>
      </div>
    </form>
  </b-container>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    name: 'AddDepartment',
    data: () => ({
      departamento: '',
    }),
    methods: {
      ...mapActions('admin/departments', ['addDepartment']),
      handleSubmit() {
        this.addDepartment(this.departamento);
        this.departamento = '';
      },
    },
  };
</script>

<style>
</style>