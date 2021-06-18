<template>
  <div class="mt-4">
    <h3>Actualizar la información de un estudiante</h3>
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
      <!-- Carrera -->
      <div class="form-group">
        <label class="form-label">Carrera</label>
        <b-form-select v-model="selected.carrera.carrera_id" :options="carreras" required></b-form-select>
      </div>
      <b-button variant="success" type="submit">Guardar</b-button>
    </form>
  </div>
</template>

<script>
  import { mapActions, mapMutations, mapState } from 'vuex';
  export default {
    data() {
      return {
        carreras: [],
      };
    },
    computed: {
      ...mapState('admin/estudiantes', ['selected']),
    },
    methods: {
      ...mapActions('admin/estudiantes', ['updateEstudiante']),
      ...mapMutations('admin/estudiantes', ['setSelected']),
      handleSubmit() {
        this.updateEstudiante({
          nombre: this.selected.nombre,
          a_paterno: this.selected.a_paterno,
          a_materno: this.selected.a_materno,
          carrera: this.selected.carrera.carrera_id,
          id: this.selected.estudiante_id,
        });
      },
    },
    async created() {
      const resp = await this.axios.get('/carrera');
      this.carreras = resp.data.map((x) => {
        return { value: x.carrera_id, text: x.carrera };
      });

      //set selected
      const id = this.$route.params.id;
      this.setSelected(id);
      console.log(this.selected);
    },
  };
</script>

<style>
</style>