<template>
  <div>
    <div class="header">
      <div class="container-fluid row align-items-center pl-5">
        <div class="col-sm-5">
          <h2>Sistema de Control de COVID-19 ITC</h2>
          <p>
            La enfermedad por coronavirus (COVID 19) es una ‎enfermedad infecciosa causada por un ‎coronavirus recientemente descubierto.
            Es importante llevar un correcto control de esta enfermedad, por lo que pedimos tu total cooperación para lograr un regreso a clases
            sin contagios.‎
          </p>
          <a href="#sintomas" class="btn btn-outline-light">Conoce más</a>
        </div>
        <div class="col-sm-7 text-right">
          <div class="icon">
            <img src="../../../assets/medicine_icon.png" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="requireSurvey" style="cursor: pointer;" v-on:click="encuesta" class="banner mt-3">
      <h5>Por órdenes médicas usted debe contestar la encuesta de Covid-19. Haga click aquí, es por la seguridad de todos.</h5>
    </div>
    <section class="container my-3 text-center" id="sintomas">
      <h4 class="title">¿Sabes cuáles son los síntomas?</h4>

      <div class="row px-2 justify-content-around">
        <syntom class="col-md-2" icon="fiebre.png" name="Fiebre" />
        <syntom class="col-md-2" icon="tos.png" name="Tos Seca" />
        <syntom class="col-md-2" icon="cansancio.png" name="Cansancio" />
        <syntom class="col-md-2" icon="dolor_garganta.png" name="Dolor de Garganta" />
        <syntom class="col-md-2" icon="perdida_gusto.png" name="Perdida del Gusto" />
      </div>
    </section>

    <section class="container my-5 text-center">
      <h4 class="title">Aquí tienes algunas recomendaciones</h4>

      <div class="row justify-content-center">
        <recomendation
          class="col-md-4 mt-2"
          icon="lavarse_manos.png"
          recomendacion="Lavarme las manos con frecuencia y utilizar gel antibacterial"
        />
        <recomendation
          class="col-md-4 mt-2"
          icon="toser.png"
          recomendacion="Toser y estornudar cubriéndome la boca con un pañuelo desechable o con la parte interna del codo"
        />
        <recomendation
          class="col-md-4 mt-2"
          icon="cubrebocas.png"
          recomendacion="Evita el contacto con personas enfermas. En la medida de lo posible siempre usa tu cubrebocas"
        />
      </div>
    </section>

    <section class="container my-5 text-center contagios">
      <h4 class="title">¿Cómo se contagia el coronavirus?</h4>

      <div class="row justify-content-between align-items-center">
        <div class="col-md-8">
          <p>El virus que causa la COVID‑19 se transmite principalmente a través de las gotículas generadas cuando una persona infectada tose, estornuda o espira.</p>
        </div>
        <div class="col-md-4">
          <img src="../../../assets/particulas.png" />
        </div>
      </div>

      <div class="row justify-content-between align-items-center">
        <div class="col-md-4">
          <img src="../../../assets/saludo.png" />
        </div>
        <div class="col-md-8">
          <p>Tambien te puedes infectar al inhalar el virus si está cerca de una persona con COVID‑19 o si, tras tocar una superficie contaminada, te tocas los ojos, la nariz o la boca.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import recomendation from '../components/recomendation.vue';
  import syntom from '../components/syntom.vue';
  export default {
    name: 'Home',
    components: {
      syntom,
      recomendation,
    },
    methods: {
      encuesta: function () {
        this.$router.push({
          name: 'FormS',
        });
      },
    },
    computed: {
      ...mapState(['usuario', 'rol']),
      requireSurvey() {
        return (
          this.rol === 'personal' ||
          (this.rol === 'estudiante' && this.usuario.requireSurvey)
        );
      },
    },
  };
</script>

<style scoped>
  .header {
    height: 90vh;
    background-color: #17a2b8;
    color: white;
    border-bottom-right-radius: 50px;
    border-bottom-left-radius: 50px;
  }

  @media (min-width: 576px) {
    .header {
      height: 70vh;
    }
  }
  .icon img {
    max-width: 85%;
  }
  .title {
    text-align: center;
    margin-bottom: 2rem;
  }
  .title::after {
    content: '';
    margin: 0 auto;
    background-image: url(../../../assets/separador.png);
    height: 1.5rem;
    width: 5.5rem;
    display: block;
  }
  .contagios img {
    width: 200px;
  }

  .banner {
    padding: 1.5rem 1rem;
    background-color: #8f0808;
    color: white;
    border-radius: 1000px;
    text-align: center;
  }
  .banner h5 {
    margin: 0;
  }
</style>
