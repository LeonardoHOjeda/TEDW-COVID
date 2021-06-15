<template>
  <div>
    <div class="mt-3 text-center">
      <b-alert
        :show="dismissCountDown"
        dismissible
        :variant="mensaje.color"
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="countDownChanged"
      >
        {{mensaje.texto}}
      </b-alert>
    </div>
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
            v-model="$v.nombre.$model"
            :class="{'is-invalid': $v.nombre.$error, 'is-valid': $v.nombre.required}"
            >
            <p class="text-danger" v-if="!$v.nombre.minLength">Minimo 4 caracteres</p>
            <p class="text-danger" v-if="!$v.nombre.required && $v.nombre.$dirty ">Campo Requerido</p>
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
            v-model="$v.a_paterno.$model"
            :class="{'is-invalid': $v.a_paterno.$error, 'is-valid': $v.a_paterno.required}"
            >
            <p class="text-danger" v-if="!$v.a_paterno.minLength">Minimo 4 caracteres</p>
            <p class="text-danger" v-if="!$v.a_paterno.required && $v.a_paterno.$dirty ">Campo Requerido</p>
        </div>
          <!-- Materno -->
        <div class="mb-3">
          <label class="form-label" for="a_materno">Apellido Materno</label>
          <input 
            class="form-control" 
            id="a_materno" 
            type="text" 
            placeholder="Apellido Materno..."
            v-model="$v.a_materno.$model"
            :class="{'is-invalid': $v.a_materno.$error, 'is-valid': $v.a_materno.required}"
            >
            <p class="text-danger" v-if="!$v.a_materno.minLength">Minimo 4 caracteres</p>
            <p class="text-danger" v-if="!$v.a_materno.required && $v.a_materno.$dirty ">Campo Requerido</p>
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
          <input type="hidden" name="carrera_id" value="1">
          <!-- <p class="text-danger" v-if="!$v.password.required">Campo requerido</p> -->
          <!-- <p>{{$v.repeatPassword}}</p> -->
        </div>
        <b-button block variant="success" type="submit" :disabled="$v.$invalid">Registrarse <i class="fas fa-user-plus"></i></b-button>
        <!-- <p>{{$v.$invalid}}</p> -->
      </form>
    </b-container>
  </div>
</template>

<script>
import { required, email, minLength, sameAs} from 'vuelidate/lib/validators'
export default {
    data() {
      return {
          email: '',
          password: '',
          repeatPassword: '',
          nombre: '',
          a_paterno: '',
          a_materno: '',
          dismissSecs: 5,
          dismissCountDown: 0,
          mensaje: {
            texto: '',
            color: ''
          }
      }
    },
    validations: {
      nombre:{
        required,
        minLength: minLength(4)
      },
      a_paterno:{
        required,
        minLength: minLength(4)
      },
      a_materno:{
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
        const jsonData = {
          nombre: this.nombre,
          a_paterno: this.a_paterno,
          a_materno: this.a_materno,
          email: this.email,
          password: this.password,
          carrera_id: 1
        }
        console.log(jsonData);
        this.$v.$touch()
        if(this.$v.$invalid){
          console.log('Se genero un error');
        }else{
          this.axios.post('/estudiantes/signup', jsonData)
            .then(res => {
              console.log(res);
              this.nombre = ''
              this.a_paterno = ''
              this.a_materno = ''
              this.email = ''
              this.password = ''
              this.repeatPassword = ''

              this.mensaje.color = 'success'
              this.mensaje.texto = 'Se ha creado el usuario de manera exitosa'
              this.mostrarAlerta()
            })
            .catch(e => {
              console.log(e.response);
              if(e.response.data.message){
                this.mensaje.texto = 'Error: ' + e.response.data.message + ' favor de corregir los valores o contacar al dpto de TI'
              } else {
                this.mensaje.texto = 'Ocurrio un error de sistema'
              }
              this.mensaje.color = 'danger'
              this.mostrarAlerta()
            })
        }
      },
      mostrarAlerta(){
        this.dismissCountDown = this.dismissSecs
      },
      countDownChanged(dismissCountDown){
        this.dismissCountDown = dismissCountDown
      }
    }
  }
</script>

<style>

</style>