<template>
  <div>
    <b-alert v-if="mensaje!=''" show variant="danger" class="mt-3" dismissible fade>{{mensaje}}</b-alert>
    <div class="wrapper fadeInDown mt-5">
      <div id="formContent">
        <!-- Tabs Titles -->

        <!-- Icon -->
        <div class="fadeIn first">
          <img
            src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
            id="icon"
            alt="User Icon"
          />
        </div>

        <!-- Login Form -->
        <form @submit.prevent="login">
          <input
            type="email"
            id="login"
            class="fadeIn second"
            name="login"
            placeholder="Correo"
            v-model="$v.email.$model"
            :class="{'is-invalid': $v.email.$error, 'is-valid': $v.email.required}"
          />
          <small>
            <p class="text-danger text-left ml-5" v-if="!$v.email.email">Email no válido</p>
          </small>
          <input
            type="password"
            id="password"
            class="fadeIn third"
            name="login"
            placeholder="Contraseña"
            v-model="$v.password.$model"
            :class="{'is-invalid': !$v.password.required && $v.password.$dirty}"
          />
          <button type="submit" class="fadeIn fourth" value="Log In" :disabled="$v.$invalid">
            <div v-if="loading" class="spinner-border spinner-border-sm mr-2"></div>LOG IN
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import { required, email } from 'vuelidate/lib/validators';
  export default {
    data() {
      return {
        email: '',
        password: '',
        mensaje: '',
        loading: false,
      };
    },
    validations: {
      email: { required, email },
      password: {
        required,
      },
    },
    methods: {
      ...mapActions(['guardarUsuario']),
      login() {
        this.loading = true;
        this.$v.$touch();
        if (this.$v.$invalid) {
          console.log('Se genero un error');
        } else {
          const usuario = {
            email: this.email,
            password: this.password,
          };
          this.axios
            .post('/usuarios/login', usuario)
            .then((rest) => {
              const objeto = {
                token: rest.data.token,
                usuario: rest.data.usuario,
              };
              this.guardarUsuario(objeto);
              (this.email = ''), (this.password = '');
            })
            .catch((err) => {
              this.mensaje = 'Credenciales inválidas';
              this.loading = false;
              setTimeout(() => (this.mensaje = ''), 3000);
              console.log(err.response);
            });
        }
      },
    },
  };
</script>

<style>
  /* BASIC */

  h2 {
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    display: inline-block;
    margin: 40px 8px 10px 8px;
    color: #cccccc;
  }

  /* STRUCTURE */

  .wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    min-height: 100%;
    padding: 20px;
  }

  #formContent {
    -webkit-border-radius: 10px 10px 10px 10px;
    border-radius: 10px 10px 10px 10px;
    background: #fff;
    padding: 30px;
    width: 90%;
    max-width: 450px;
    position: relative;
    padding: 0px;
    -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
    box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
    text-align: center;
  }

  #formFooter {
    background-color: #f6f6f6;
    border-top: 1px solid #dce8f1;
    padding: 25px;
    text-align: center;
    -webkit-border-radius: 0 0 10px 10px;
    border-radius: 0 0 10px 10px;
  }

  /* TABS */

  h2.inactive {
    color: #cccccc;
  }

  h2.active {
    color: #0d0d0d;
    border-bottom: 2px solid #5fbae9;
  }

  /* FORM TYPOGRAPHY*/

  input[type='button'],
  button[type='submit'],
  input[type='reset'] {
    background-color: #56baed;
    border: none;
    color: white;
    padding: 15px 80px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    text-transform: uppercase;
    font-size: 13px;
    -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
    box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
    -webkit-border-radius: 5px 5px 5px 5px;
    border-radius: 5px 5px 5px 5px;
    margin: 5px 20px 40px 20px;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
  }

  input[type='button']:hover,
  button[type='submit']:hover,
  input[type='reset']:hover {
    background-color: #39ace7;
  }

  input[type='button']:active,
  input[type='submit']:active,
  input[type='reset']:active {
    -moz-transform: scale(0.95);
    -webkit-transform: scale(0.95);
    -o-transform: scale(0.95);
    -ms-transform: scale(0.95);
    transform: scale(0.95);
  }

  input[type='email'],
  input[type='password'] {
    background-color: #f6f6f6;
    border: none;
    color: #0d0d0d;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 5px;
    width: 85%;
    border: 2px solid #f6f6f6;
    -webkit-transition: all 0.5s ease-in-out;
    -moz-transition: all 0.5s ease-in-out;
    -ms-transition: all 0.5s ease-in-out;
    -o-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
    -webkit-border-radius: 5px 5px 5px 5px;
    border-radius: 5px 5px 5px 5px;
  }

  input[type='email']:focus,
  input[type='password']:focus {
    background-color: #fff;
    border-bottom: 2px solid #5fbae9;
  }

  input[type='email']::placeholder,
  input[type='password']::placeholder {
    color: #cccccc;
  }

  /* ANIMATIONS */

  /* Simple CSS3 Fade-in-down Animation */
  .fadeInDown {
    -webkit-animation-name: fadeInDown;
    animation-name: fadeInDown;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  @-webkit-keyframes fadeInDown {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
    100% {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }

  @keyframes fadeInDown {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
    100% {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }

  /* Simple CSS3 Fade-in Animation */
  @-webkit-keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-moz-keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .fadeIn {
    opacity: 0;
    -webkit-animation: fadeIn ease-in 1;
    -moz-animation: fadeIn ease-in 1;
    animation: fadeIn ease-in 1;

    -webkit-animation-fill-mode: forwards;
    -moz-animation-fill-mode: forwards;
    animation-fill-mode: forwards;

    -webkit-animation-duration: 1s;
    -moz-animation-duration: 1s;
    animation-duration: 1s;
  }

  .fadeIn.first {
    -webkit-animation-delay: 0.4s;
    -moz-animation-delay: 0.4s;
    animation-delay: 0.4s;
  }

  .fadeIn.second {
    -webkit-animation-delay: 0.6s;
    -moz-animation-delay: 0.6s;
    animation-delay: 0.6s;
  }

  .fadeIn.third {
    -webkit-animation-delay: 0.8s;
    -moz-animation-delay: 0.8s;
    animation-delay: 0.8s;
  }

  .fadeIn.fourth {
    -webkit-animation-delay: 1s;
    -moz-animation-delay: 1s;
    animation-delay: 1s;
  }

  /* Simple CSS3 Fade-in Animation */
  .underlineHover:after {
    display: block;
    left: 0;
    bottom: -10px;
    width: 0;
    height: 2px;
    background-color: #56baed;
    content: '';
    transition: width 0.2s;
  }

  .underlineHover:hover {
    color: #0d0d0d;
  }

  .underlineHover:hover:after {
    width: 100%;
  }

  /* OTHERS */

  *:focus {
    outline: none;
  }

  #icon {
    max-width: 100px;
  }

  .is-invalid {
    border: 1px solid rgba(255, 0, 0, 0.4) !important;
  }

  button[type="submit"]:disabled{
    background-color: #e1e1e1;
  }
</style>
