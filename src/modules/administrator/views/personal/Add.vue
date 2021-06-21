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
      <!-- Departamento -->
      <div class="form-group">
        <label class="form-label">Departamento</label>
        <b-form-select v-model="departamento" :options="departamentos" required>
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
        rfc: '',
        departamento: null,
        departamentos: [],
      };
    },
    methods: {
      ...mapActions('admin/personal', ['addPersonal']),
      handleSubmit() {
        this.addPersonal({
          email: this.email,
          nombre: this.nombre,
          a_paterno: this.a_paterno,
          a_materno: this.a_materno,
          departamento: this.departamento,
          rfc: this.rfc
        });
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