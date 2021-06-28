<template>
  <b-container class="mt-4">
    <div class="d-flex justify-content-between mb-3">
      <h3 class="m-0">Actualizar departamento</h3>
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="depto">Nombre del departamento</label>
        <input
          type="text"
          class="form-control"
          id="depto"
          autofocus
          v-model="selected.departamento"
        />
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary">Guardar</button>
      </div>
    </form>
  </b-container>
</template>

<script>
  import { mapActions, mapMutations, mapState } from 'vuex';
  export default {
    name: 'UpdateDepartment',
    data: () => ({
      departamento: '',
    }),
    computed: {
      ...mapState('admin/departments', ['selected']),
    },
    methods: {
      ...mapActions('admin/departments', ['updateDepartment']),
      ...mapMutations('admin/departments', ['setSelected']),
      handleSubmit() {
        const { departamento_id, departamento } = this.selected;
        this.updateDepartment({
          id: departamento_id,
          nombre: departamento,
        });
        this.departamento = '';
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