<template>
  <div>
    <div class="mt-3 text-center">
      <b-alert
        :show="dismissCountDown"
        dismissible
        :variant="mensaje.color"
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="countDownChanged"
      >{{mensaje.texto}}</b-alert>
    </div>
    <div class="row justify-content-center p-3">
      <div
        class="mt-2 card mb-5 shadow col-md-7 animate__animated animate__flipInY"
        style="border-radius: 20px"
      >
        <div class="card-body">
          <h3 class="mb-3">Registrar usuario</h3>
          <form @submit.prevent="submit">
            <!-- Nombre -->
            <div class="mb-3 form-group row">
              <label class="col-sm-4 col-form-label" for="name">Nombre</label>
              <div class="col-sm-8">
                <input
                  class="form-control"
                  id="name"
                  type="text"
                  placeholder="Nombre..."
                  v-model="$v.nombre.$model"
                  :class="{'is-invalid': $v.nombre.$error, 'is-valid': $v.nombre.required}"
                />
                <small>
                  <p class="text-danger" v-if="!$v.nombre.minLength">Minimo 4 caracteres</p>
                </small>
                <small>
                  <p
                    class="text-danger"
                    v-if="!$v.nombre.required && $v.nombre.$dirty "
                  >Campo Requerido</p>
                </small>
              </div>
            </div>

            <!-- Apellidos -->
            <!-- Paterno -->
            <div class="mb-3 form-group row">
              <label class="col-sm-4 col-form-label" for="last_nameFather">Apellido Paterno</label>
              <div class="col-sm-8">
                <input
                  class="form-control"
                  id="last_nameFather"
                  type="text"
                  placeholder="Apellido Paterno..."
                  v-model="$v.a_paterno.$model"
                  :class="{'is-invalid': $v.a_paterno.$error, 'is-valid': $v.a_paterno.required}"
                />
                <small>
                  <p class="text-danger" v-if="!$v.a_paterno.minLength">Minimo 4 caracteres</p>
                </small>
                <small>
                  <p
                    class="text-danger"
                    v-if="!$v.a_paterno.required && $v.a_paterno.$dirty "
                  >Campo Requerido</p>
                </small>
              </div>
            </div>

            <!-- Materno -->
            <div class="mb-3 form-group row">
              <label class="col-sm-4 col-form-label" for="a_materno">Apellido Materno</label>
              <div class="col-sm-8">
                <input
                  class="form-control"
                  id="a_materno"
                  type="text"
                  placeholder="Apellido Materno..."
                  v-model="$v.a_materno.$model"
                  :class="{'is-invalid': $v.a_materno.$error, 'is-valid': $v.a_materno.required}"
                />
                <small>
                  <p class="text-danger" v-if="!$v.a_materno.minLength">Minimo 4 caracteres</p>
                </small>
                <small>
                  <p
                    class="text-danger"
                    v-if="!$v.a_materno.required && $v.a_materno.$dirty "
                  >Campo Requerido</p>
                </small>
              </div>
            </div>

            <!-- Correo electronico -->
            <div class="mb-3 form-group row">
              <label for="emailInstitute" class="col-sm-4 col-form-label">Correo institucional</label>
              <div class="col-sm-8">
                <input
                  class="form-control"
                  type="email"
                  placeholder="Ingresa tu correo institucional"
                  v-model="$v.email.$model"
                  :class="{'is-invalid': $v.email.$error, 'is-valid': $v.email.required}"
                  id="emailInstitute"
                />
                <small>
                  <p class="text-danger" v-if="!$v.email.email">Este email es incorrecto</p>
                </small>
                <small>
                  <p
                    class="text-danger"
                    v-if="!$v.email.required && $v.email.$dirty "
                  >Campo Requerido</p>
                </small>
              </div>
            </div>

            <!-- Constrasena -->
            <div class="mb-3 form-group row">
              <label for="password" class="col-sm-4 col-form-label">Password</label>
              <div class="col-sm-8">
                <input
                  class="form-control"
                  type="password"
                  placeholder="Ingresa Contrasena"
                  v-model="$v.password.$model"
                  :class="{'is-invalid': $v.password.$error, 'is-valid': $v.password.required}"
                  id="password"
                />
                <small>
                  <p class="text-danger" v-if="!$v.password.minLength">Minimo 6 caracteres</p>
                </small>
                <small>
                  <p
                    class="text-danger"
                    v-if="!$v.password.required && $v.password.$dirty "
                  >Campo Requerido</p>
                </small>
              </div>
            </div>

            <!-- Repite Contrasena -->
            <div class="mb-3 form-group row">
              <label for="passwordRepeat" class="col-sm-4 col-form-label">Repite tu contrasena</label>
              <div class="col-sm-8">
                <input
                  type="password"
                  placeholder="Repite tu contrasena..."
                  class="form-control"
                  v-model="$v.repeatPassword.$model"
                  :class="{'is-invalid': $v.repeatPassword.$error, 'is-valid': $v.repeatPassword.required}"
                  id="passwordRepeat"
                />
                <small>
                  <p
                    class="text-danger"
                    v-if="!$v.repeatPassword.sameAsPassword"
                  >Las contrasenas no coinciden</p>
                </small>
              </div>
            </div>

            <!-- Carrera -->
            <div class="mb-3 form-group row">
              <label for="carrea" class="col-sm-4 col-form-label">Selecciona tu carrera</label>
              <div class="col-sm-8">
                <select class="custom-select" v-model="carrera" required>
                  <option disabled value>--Selecciona una carrera--</option>
                  <option
                    v-for="(item, index) in carreras"
                    :key="index"
                    :value="item.carrera_id"
                  >{{item.carrera}}</option>
                </select>
              </div>
            </div>
            <b-button
              block
              variant="success"
              type="submit"
              :disabled="$v.$invalid"
              style="margin: 0"
            >
              Registrarse
              <i class="fas fa-user-plus"></i>
            </b-button>
            <!-- <p>{{$v.$invalid}}</p> -->
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';
  export default {
    data() {
      return {
        carreras: [],
        selected: '',
        email: '',
        password: '',
        repeatPassword: '',
        nombre: '',
        a_paterno: '',
        a_materno: '',
        carrera: '',
        dismissSecs: 5,
        dismissCountDown: 0,
        mensaje: {
          texto: '',
          color: '',
        },
      };
    },
    validations: {
      nombre: {
        required,
        minLength: minLength(4),
      },
      a_paterno: {
        required,
        minLength: minLength(4),
      },
      a_materno: {
        required,
        minLength: minLength(4),
      },
      email: { required, email },
      password: {
        required,
        minLength: minLength(6),
      },
      repeatPassword: {
        required,
        sameAsPassword: sameAs('password'),
      },
    },
    methods: {
      submit() {
        const jsonData = {
          nombre: this.nombre,
          a_paterno: this.a_paterno,
          a_materno: this.a_materno,
          email: this.email,
          password: this.password,
          carrera_id: this.carrera,
        };
        console.log(jsonData);
        this.$v.$touch();
        if (this.$v.$invalid) {
          console.log('Se genero un error');
        } else {
          this.axios
            .post('/estudiantes/signup', jsonData)
            .then((res) => {
              console.log(res);
              this.nombre = '';
              this.a_paterno = '';
              this.a_materno = '';
              this.email = '';
              this.password = '';
              this.repeatPassword = '';

              this.mensaje.color = 'success';
              this.mensaje.texto = 'Se ha creado el usuario de manera exitosa';
              this.mostrarAlerta();
            })
            .catch((e) => {
              console.log(e.response);
              if (e.response.data.message) {
                this.mensaje.texto =
                  'Error: ' +
                  e.response.data.message +
                  ' favor de corregir los valores o contacar al dpto de TI';
              } else {
                this.mensaje.texto = 'Ocurrio un error de sistema';
              }
              this.mensaje.color = 'danger';
              this.mostrarAlerta();
            });
        }
      },
      obtenerCarreras() {
        this.axios
          .get('/carrera')
          .then((res) => {
            console.log(res);
            for (let i = 0; i < res.data.length; i++) {
              this.carreras.push(res.data[i]);
            }
            // this.carreras = res.data.carrera
            console.log(this.carreras);
          })
          .catch((err) => {
            console.log(err.response);
          });
      },
      mostrarAlerta() {
        this.dismissCountDown = this.dismissSecs;
      },
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown;
      },
    },
    created() {
      this.obtenerCarreras();
    },
  };
</script>

<style scoped>
  button[type='submit']:disabled {
    background-color: #e1e1e1;
    border-color: #e1e1e1;
  }
</style>