<template>
  <div class="mt-4">
    <h3>Registrar al Personal Académico</h3>
    <form @submit.prevent="handleSubmit">
      <!-- Nombre -->
      <div class="mb-3">
        <label class="form-label" for="name">Nombre</label>
        <input
          class="form-control"
          id="name"
          type="text"
          placeholder="Nombre..."
          v-model="selected.nombre"
          required
        />
      </div>
      <!-- Apellidos -->
      <!-- Paterno -->
      <div class="mb-3">
        <label class="form-label" for="last_nameFather">Apellido Paterno</label>
        <input
          class="form-control"
          id="last_nameFather"
          type="text"
          placeholder="Apellido Paterno..."
          v-model="selected.a_paterno"
          required
        />
      </div>
      <!-- Materno -->
      <div class="mb-3">
        <label class="form-label" for="a_materno">Apellido Materno</label>
        <input
          class="form-control"
          id="a_materno"
          type="text"
          placeholder="Apellido Materno..."
          v-model="selected.a_materno"
          required
        />
      </div>
      <!-- RFC -->
      <div class="mb-3">
        <label class="form-label">RFC</label>
        <input
          class="form-control"
          type="text"
          placeholder="RFC"
          v-model="selected.rfc"
          max="13"
          required
        />
      </div>
      <!-- Cedula -->
      <div class="mb-3">
        <label class="form-label">Cédula Profesional</label>
        <input
          class="form-control"
          type="text"
          placeholder="Cédula"
          v-model="selected.cedula"
          required
        />
      </div>
      <b-button variant="success" type="submit">Guardar</b-button>
    </form>
  </div>
</template>

<script>
  import { mapActions, mapMutations, mapState } from 'vuex';
  export default {
    data() {
      return {};
    },
    computed: {
      ...mapState('admin/medicos', ['selected']),
    },
    methods: {
      ...mapActions('admin/medicos', ['updateMedico']),
      ...mapMutations('admin/medicos', ['setSelected']),
      handleSubmit() {
        this.updateMedico({
          nombre: this.selected.nombre,
          a_paterno: this.selected.a_paterno,
          a_materno: this.selected.a_materno,
          rfc: this.selected.rfc,
          cedula: this.selected.cedula,
          medico_id: this.selected.medico_id,
        });
      },
    },
    async created() {
      //set selected
      const id = this.$route.params.id;
      this.setSelected(id);
      console.log(this.selected);
    },
  };
</script>

<style>
</style>