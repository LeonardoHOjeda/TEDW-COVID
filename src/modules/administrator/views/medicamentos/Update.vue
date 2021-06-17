<template>
  <div class="mt-4">
    <div class="d-flex justify-content-between mb-3">
      <h3 class="m-0">Actualizar un medicamento</h3>
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="depto">Descripcion del medicamento</label>
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
      ...mapState('admin/medicamentos', ['selected']),
    },
    methods: {
      ...mapActions('admin/medicamentos', ['updateMedicamento']),
      ...mapMutations('admin/medicamentos', ['setSelected']),
      handleSubmit() {
        const { medicamento_id, descripcion } = this.selected;
        this.updateMedicamento({
          medicamento_id,
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