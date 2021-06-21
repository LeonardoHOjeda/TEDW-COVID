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
      <!-- Departamento -->
      <div class="form-group">
        <label class="form-label">Departamento</label>
        <b-form-select
          v-model="selected.departamento.departamento_id"
          :options="departamentos"
          required
        ></b-form-select>
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
        departamentos: [],
      };
    },
    computed: {
      ...mapState('admin/personal', ['selected']),
    },
    methods: {
      ...mapActions('admin/personal', ['updatePersonal']),
      ...mapMutations('admin/personal', ['setSelected']),
      handleSubmit() {
        this.updatePersonal({
          nombre: this.selected.nombre,
          a_paterno: this.selected.a_paterno,
          a_materno: this.selected.a_materno,
          rfc: this.selected.rfc,
          departamento: this.selected.departamento.departamento_id,
          id: this.selected.personal_id,
        });
      },
    },
    async created() {
      const resp = await this.axios.get('/departamento');
      this.departamentos = resp.data.map((x) => {
        return { value: x.departamento_id, text: x.departamento };
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