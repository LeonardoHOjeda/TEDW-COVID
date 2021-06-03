<template>
  <div>
    <b-container class="mt-5">
      <h1>Login</h1>
      <form @submit.prevent="submit">
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
          <!-- <p>{{$v.email}}</p> -->
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
        <!-- <p>{{$v.password}}</p> -->
        </div>
  
        <b-button block variant="primary" type="submit" :disabled="$v.$invalid">Login</b-button>
      </form>
    </b-container>
  </div>
</template>

<script>
import { required, email, minLength} from 'vuelidate/lib/validators'
export default {
  name: 'Login',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    validations: {
      email:{required, email},
      password: {
        required,
        minLength: minLength(6)
      }
    },
    methods: {
      submit(){
        console.log('Submit!');
        this.$v.$touch()
        if(this.$v.$invalid){
          console.log('Se genero un error');
        }else{
          console.log('Todos los campos correctos');
        }
      }
    }
  }
</script>

<style>

</style>