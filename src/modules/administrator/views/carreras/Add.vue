<template>
  <div class="mt-4">
    <div class="d-flex justify-content-between mb-3">
      <h3 class="m-0">Agregar carrera</h3>
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="depto">Nombre de la Carrera</label>
        <b-form-input
          type="text"
          class="form-control"
          id="depto"
          autofocus
          v-model="carrera"
          required
        />
      </div>
      <div class="form-group">
        <b-form-select v-model="departamento" :options="departamentos" required>
          <template #first>
            <b-form-select-option :value="null" disabled>-- Selecciona --</b-form-select-option>
          </template>
        </b-form-select>
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
      departamento: null,
      carrera: '',
      departamentos: [],
    }),
    methods: {
      ...mapActions('admin/carreras', ['addCarrera']),
      handleSubmit() {
        this.addCarrera({
          nombre: this.carrera,
          departamento_id: this.departamento,
        });
        this.carrera = '';
        this.departamento = null;
      },
    },
    async created() {
      const resp = await this.axios.get('/departamento');
      this.departamentos = resp.data.map((x) => {
        return { value: x.departamento_id, text: x.departamento };
      });
    },
  };
</script>

<style>
</style>