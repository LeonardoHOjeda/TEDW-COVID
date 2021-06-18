<template>
  <div class="mt-4">
    <h3>Registrar a un estudiante</h3>
    <form @submit.prevent="handleSubmit">
      <!-- Nombre -->
      <div class="mb-3">
        <label class="form-label" for="name">Nombre</label>
        <input
          class="form-control"
          id="name"
          type="text"
          placeholder="Nombre..."
          v-model="nombre"
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
          v-model="a_paterno"
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
          v-model="a_materno"
          required
        />
      </div>
      <!-- Correo electronico -->
      <div class="mb-3">
        <label for="emailInstitute" class="form-label">Correo institucional</label>
        <input
          class="form-control"
          type="email"
          placeholder="Ingresa tu correo institucional"
          v-model="email"
          id="emailInstitute"
          required
        />
      </div>
      <!-- Carrera -->
      <div class="form-group">
        <label class="form-label">Carrera</label>
        <b-form-select v-model="carrera" :options="carreras" required>
          <template #first>
            <b-form-select-option :value="null" disabled>-- Selecciona --</b-form-select-option>
          </template>
        </b-form-select>
      </div>
      <b-button variant="success" type="submit">Guardar</b-button>
    </form>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    data() {
      return {
        email: '',
        nombre: '',
        a_paterno: '',
        a_materno: '',
        carrera: null,
        carreras: [],
      };
    },
    methods: {
      ...mapActions('admin/estudiantes', ['addEstudiante']),
      handleSubmit() {
        this.addEstudiante({
          email: this.email,
          nombre: this.nombre,
          a_paterno: this.a_paterno,
          a_materno: this.a_materno,
          carrera: this.carrera,
        });
      },
    },
    async created() {
      const resp = await this.axios.get('/carrera');
      this.carreras = resp.data.map((x) => {
        return { value: x.carrera_id, text: x.carrera };
      });
    },
  };
</script>

<style>
</style>