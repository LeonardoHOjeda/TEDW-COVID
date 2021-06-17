<template>
  <div class="mt-4">
    <div class="d-flex justify-content-between mb-3">
      <h3 class="m-0">Actualizar un Tipo de Prueba</h3>
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="depto">Descripcion del tipo de Prueba</label>
        <b-form-input
          type="text"
          class="form-control"
          id="depto"
          autofocus
          v-model="selected.descripcion"
        />
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
    name: 'UpdateMedicamento',
    data: () => ({}),
    computed: {
      ...mapState('admin/tipo_prueba', ['selected']),
    },
    methods: {
      ...mapActions('admin/tipo_prueba', ['updateTipo']),
      ...mapMutations('admin/tipo_prueba', ['setSelected']),
      handleSubmit() {
        const { tipo_id, descripcion } = this.selected;
        this.updateTipo({
          tipo_id,
          descripcion,
        });
      },
    },
    created() {
      const id = Number(this.$route.params.id);
      this.setSelected(id);
    },
  };
</script>

<style>
</style>