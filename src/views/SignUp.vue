<template>
  <div>
    <b-container class="mt-5">
      <h1>Registrar usuario</h1>
      <form @submit.prevent="submit">
        <!-- Nombre -->
        <div class="mb-3">
          <label class="form-label" for="name">Nombre</label>
          <input 
            class="form-control" 
            id="name" 
            type="text" 
            placeholder="Nombre..."
            v-model="$v.name.$model"
            :class="{'is-invalid': $v.name.$error, 'is-valid': $v.name.required}"
            >
            <p class="text-danger" v-if="!$v.name.minLength">Minimo 4 caracteres</p>
            <p class="text-danger" v-if="!$v.name.required && $v.name.$dirty ">Campo Requerido</p>
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
            v-model="$v.last_nameFather.$model"
            :class="{'is-invalid': $v.last_nameFather.$error, 'is-valid': $v.last_nameFather.required}"
            >
            <p class="text-danger" v-if="!$v.last_nameFather.minLength">Minimo 4 caracteres</p>
            <p class="text-danger" v-if="!$v.last_nameFather.required && $v.last_nameFather.$dirty ">Campo Requerido</p>
        </div>
          <!-- Materno -->
        <div class="mb-3">
          <label class="form-label" for="last_nameMother">Apellido Materno</label>
          <input 
            class="form-control" 
            id="last_nameMother" 
            type="text" 
            placeholder="Apellido Materno..."
            v-model="$v.last_nameMother.$model"
            :class="{'is-invalid': $v.last_nameMother.$error, 'is-valid': $v.last_nameMother.required}"
            >
            <p class="text-danger" v-if="!$v.last_nameMother.minLength">Minimo 4 caracteres</p>
            <p class="text-danger" v-if="!$v.last_nameMother.required && $v.last_nameMother.$dirty ">Campo Requerido</p>
        </div>
        <!-- Correo electronico -->
        <div class="mb-3">
          <label for="emailInstitute" class="form-label">Correo institucional</label>
          <input 
            class="form-control" 
            type="email" 
            placeholder="Ingresa tu correo institucional" 
            v-model="$v.email.$model" 
            :class="{'is-invalid': $v.email.$error, 'is-valid': $v.email.required}"
            id="emailInstitute"
            />
          <p class="text-danger" v-if="!$v.email.email">Este email es incorrecto</p>
          <p class="text-danger" v-if="!$v.email.required && $v.email.$dirty ">Campo Requerido</p>
          <!-- <p class="text-danger" v-if="!$v.email.required">Campo requerido</p> -->
          <!-- <p>{{$v.email}}</p> -->
        </div>
  
        <!-- Constrasena -->
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input 
            class="form-control" 
            type="password" 
            placeholder="Ingresa Contrasena" 
            v-model="$v.password.$model" 
            :class="{'is-invalid': $v.password.$error, 'is-valid': $v.password.required}"
            id="password">
          <p class="text-danger" v-if="!$v.password.minLength">Minimo 6 caracteres</p>
          <p class="text-danger" v-if="!$v.password.required && $v.password.$dirty ">Campo Requerido</p>
          <!-- <p class="text-danger" v-if="!$v.password.required">Campo requerido</p> -->
          <!-- <p>{{$v.password}}</p> -->
        </div>

        <!-- Repite Contrasena -->
        <div class="mb-3">
          <label for="passwordRepeat" class="form-label">Repite tu contrasena</label>
          <input 
            type="password" 
            placeholder="Repite tu contrasena..." 
            class="form-control" 
            v-model="$v.repeatPassword.$model" 
            :class="{'is-invalid': $v.repeatPassword.$error, 'is-valid': $v.repeatPassword.required}"
            id="passwordRepeat">
          <p class="text-danger" v-if="!$v.repeatPassword.sameAsPassword">Las contrasenas no coinciden</p>
          <!-- <p class="text-danger" v-if="!$v.password.required">Campo requerido</p> -->
          <!-- <p>{{$v.repeatPassword}}</p> -->
        </div>
        <b-button block variant="success" type="submit" :disabled="$v.$invalid">Registrarse</b-button>
        <!-- <p>{{$v.$invalid}}</p> -->
      </form>
    </b-container>
  </div>
</template>

<script>
import { required, email, minLength, sameAs} from 'vuelidate/lib/validators'
export default {
  name: 'Login',
    data() {
      return {
        name: '',
        last_nameFather: '',
        last_nameMother: '',
        email: '',
        password: '',
        repeatPassword: ''
      }
    },
    validations: {
      name:{
        required,
        minLength: minLength(4)
      },
      last_nameFather:{
        required,
        minLength: minLength(4)
      },
      last_nameMother:{
        required,
        minLength: minLength(4)
      },
      email:{required, email},
      password: {
        required,
        minLength: minLength(6)
      },
      repeatPassword:{
        required,
        sameAsPassword: sameAs('password')
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