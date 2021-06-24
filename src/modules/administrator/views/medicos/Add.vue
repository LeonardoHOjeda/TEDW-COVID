<template>
  <b-container class="mt-4">
    <h3>Registrar a un Médico</h3>
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
        <label for="emailInstitute" class="form-label">Correo</label>
        <input
          class="form-control"
          type="email"
          placeholder="Ingresa tu correo institucional"
          v-model="email"
          id="emailInstitute"
          required
        />
      </div>
      <!-- RFC -->
      <div class="mb-3">
        <label class="form-label">RFC</label>
        <input class="form-control" type="text" placeholder="RFC" v-model="rfc" max="13" required />
      </div>
      <!-- Cedula -->
      <div class="mb-3">
        <label class="form-label">Cédula Profesional</label>
        <input class="form-control" type="text" placeholder="Cédula" v-model="cedula" required />
      </div>

      <b-button variant="success" type="submit">Guardar</b-button>
    </form>
  </b-container>
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
        rfc: '',
        cedula: '',
      };
    },
    methods: {
      ...mapActions('admin/medicos', ['addMedico']),
      handleSubmit() {
        this.addMedico({
          email: this.email,
          nombre: this.nombre,
          a_paterno: this.a_paterno,
          a_materno: this.a_materno,
          rfc: this.rfc,
          cedula: this.cedula,
        });
      },
    },
  };
</script>

<style>
</style>