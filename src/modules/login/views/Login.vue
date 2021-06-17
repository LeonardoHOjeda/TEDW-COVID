<template>
  <div>
    <div class="mt-3 text-center alert alert-danger" v-if="mensaje != ''">
      <p>{{mensaje}}</p>
    </div>
    <b-container class="mt-5">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <!-- Correo electronico -->
        <div class="mb-3">
          <label for="emailInstitute" class="form-label">Correo institucional</label>
          <input 
            type="email" 
            placeholder="Ingresa tu correo institucional" 
            class="form-control" 
            v-model="$v.email.$model" 
            :class="{'is-invalid': $v.email.$error, 'is-valid': $v.email.required}"
            id="emailInstitute"
            >
          <p class="text-danger" v-if="!$v.email.email">Este email es incorrecto</p>
          <p class="text-danger" v-if="!$v.email.required && $v.email.$dirty ">Campo Requerido</p>
        </div>
  
        <!-- Constrasena -->
        <div class="mb-3">
          <label for="emailInstitute" class="form-label">Password</label>
          <input 
            type="password" 
            placeholder="Ingresa Contrasena" 
            class="form-control" 
            v-model="$v.password.$model" 
            :class="{'is-invalid': !$v.password.required && $v.password.$dirty}"
            >
          <p class="text-danger" v-if="!$v.password.required && $v.password.$dirty ">Campo Requerido</p>
        </div>
        <b-button block variant="primary" type="submit" :disabled="$v.$invalid"><div v-if="loading" class="spinner-border spinner-border-sm"></div> Login</b-button>
      </form>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { required, email} from 'vuelidate/lib/validators'
export default {
    data() {
      return {
        email: '',
        password: '',
        mensaje: '',
        loading: false
      }
    },
    validations: {
      email:{required, email},
      password: {
        required
      }
    },
    methods: {
      ...mapActions(['guardarUsuario']),
      login(){
        this.loading = true
        this.$v.$touch()
        if(this.$v.$invalid){
          console.log('Se genero un error');
        }else{
          const usuario = {
            email: this.email,
            password: this.password
          }
          this.axios.post('/usuarios/login', usuario)
            .then(rest => {
              const objeto = {
                token: rest.data.token,
                usuario: rest.data.usuario
              }
              this.guardarUsuario(objeto);
              this.email = '',
              this.password = ''
            }).catch(err => {
              this.mensaje = 'Se encontraron errores a la hora de realizar una peticion'
              console.log(err)
            })
        }
      }
    }
  }
</script>

<style>

</style>