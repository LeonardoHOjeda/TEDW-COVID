<template>
  <div class="mt-4">
    <div class="spinners" v-if="loading">
      <b-spinner type="grow" label="Spinning"></b-spinner>
      <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
      <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
    </div>
    <div v-else>
      <h3 class="mb-4">Actualizar Usuario</h3>

      <form @submit.prevent="handleSubmit">
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-10">
            <input
              type="email"
              class="form-control"
              id="inputEmail3"
              placeholder="Email"
              v-model="usuario.email"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="password" class="col-sm-2 col-form-label">Contraseña</label>
          <div class="col-sm-10">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              v-model="password"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="passwordRepeat" class="col-sm-2 col-form-label">Repetir Coontraseña</label>
          <div class="col-sm-10">
            <input
              type="password"
              class="form-control"
              id="passwordRepeat"
              placeholder="Password"
              v-model="$v.repeatPassword.$model"
              :class="{'is-invalid': !$v.repeatPassword.sameAsPassword}"
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Rol de Usuario</label>
          <div class="col-sm-10">
            <b-form-select v-model="usuario.rol.rol" :options="roles" required></b-form-select>
          </div>
        </div>
        <div class="custom-control custom-switch form-group">
          <input
            type="checkbox"
            class="custom-control-input"
            id="swHabilitado"
            v-model="usuario.habilitado"
          />
          <label class="custom-control-label" for="swHabilitado">Habilitado</label>
        </div>
        <div class="custom-control custom-switch form-group">
          <input
            type="checkbox"
            class="custom-control-input"
            id="swSospechoso"
            v-model="usuario.sospechoso"
          />
          <label class="custom-control-label" for="swSospechoso">Sospechoso</label>
        </div>
        <div class="custom-control custom-switch form-group" v-if="usuario.rol.rol !== 'medico'">
          <input
            type="checkbox"
            class="custom-control-input"
            id="swSurvey"
            v-model="usuario.requireSurvey"
          />
          <label class="custom-control-label" for="swSurvey">¿Requiere Encuesta?</label>
        </div>

        <div class="form-group row mt-4">
          <div class="col-sm-10">
            <button type="submit" class="btn btn-primary">Guardar</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import { required, sameAs } from 'vuelidate/lib/validators';

  export default {
    name: 'UpdateUsuario',
    data: () => ({
      loading: false,
      password: '',
      repeatPassword: '',
      rol: null,
      roles: [
        { value: 'estudiante', text: 'Estudiante' },
        { value: 'monitor', text: 'Monitor' },
        { value: 'personal', text: 'Personal' },
        { value: 'administrador', text: 'Administrador' },
        { value: 'directivo', text: 'Directivo' },
        { value: 'medico', text: 'Medico' },
      ],
    }),
    computed: {
      ...mapState('admin/usuarios', ['usuario']),
    },
    methods: {
      ...mapActions('admin/usuarios', ['fetchUsuario', 'updateUser']),
      handleSubmit() {
        this.$v.$touch();
        console.log(this.$v);
        if (this.$v.repeatPassword.sameAsPassword) {
          this.loading = true;
          this.updateUser({
            habilitado: this.usuario.habilitado,
            sospechoso: this.usuario.sospechoso,
            requireSurvey: this.usuario.requireSurvey,
            email: this.usuario.email,
            password: this.password,
            rol: this.usuario.rol.rol,
          });
        } else {
          console.log('error');
        }
      },
    },
    validations: {
      repeatPassword: {
        required,
        sameAsPassword: sameAs('password'),
      },
    },
    async created() {
      const usuario_id = this.$route.params.id;
      this.loading = true;
      await this.fetchUsuario(usuario_id);
      this.loading = false;
    },
  };
</script>

<style>
  .spinners {
    height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .spinners span {
    margin: 0 10px;
  }
</style>