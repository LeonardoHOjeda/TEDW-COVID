<template>
  <div class="mt-4">
    <div class="d-flex justify-content-between mb-3">
      <h3 class="m-0">Actualizar carreras</h3>
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="depto">Nombre de la Carrera</label>
        <b-form-input
          type="text"
          class="form-control"
          id="depto"
          autofocus
          v-model="selected.carrera"
          required
        />
      </div>
      <div class="form-group">
        <b-form-select v-model="departamento" :options="departamentos" required></b-form-select>
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary">Guardar</button>
      </div>
    </form>
  </div>
</template>

<script>
  import { mapActions, mapMutations, mapState } from 'vuex';
  export default {
    name: 'UpdateCarrera',
    data: () => ({
      departamento: null,
      departamentos: [],
    }),
    computed: {
      ...mapState('admin/carreras', ['selected']),
    },
    methods: {
      ...mapActions('admin/carreras', ['updateCarrera']),
      ...mapMutations('admin/carreras', ['setSelected']),
      handleSubmit() {
        this.updateCarrera({
          id: this.selected.carrera_id,
          nombre: this.selected.carrera,
          departamento_id: this.departamento,
        });
      },
    },
    async created() {
      //Establecer la carrera seleccionada
      const id = Number(this.$route.params.id);
      this.setSelected(id);
      this.departamento = this.selected.departamento.departamento_id;
      //Llenar las opciones del select
      const resp = await this.axios.get('/departamento');
      this.departamentos = resp.data.map((x) => {
        return { value: x.departamento_id, text: x.departamento };
      });
    },
  };
</script>

<style>
</style>