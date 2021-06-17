<template>
  <div class="mt-4">
    <div class="d-flex justify-content-between mb-3">
      <h3 class="m-0">Agregar Medicamento</h3>
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="depto">Descripcion del medicamento</label>
        <b-form-input type="text" class="form-control" id="depto" autofocus v-model="medicamento" />
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
    name: 'AddDepartment',
    data: () => ({
      medicamento: '',
    }),
    methods: {
      ...mapActions('admin/medicamentos', ['addMedicamento']),
      handleSubmit() {
        this.addMedicamento(this.medicamento);
        this.medicamento = '';
      },
    },
  };
</script>

<style>
</style>