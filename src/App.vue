<template>
  <div id="app">
    <Navbar :name="$route.name" :isLoggedIn="isLoggedIn" />
    <div class="contenedor">
      <router-view />
    </div>
    <Footer v-if="isLoggedIn" />
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex';
  import Footer from './components/Footer';
  import Navbar from './components/Navbar';

  export default {
    components: {
      Footer,
      Navbar,
    },
    methods: {
      ...mapActions(['cerrarSesion', 'reloadState']),
    },
    computed: {
      ...mapState(['usuario', 'token']),
      ...mapGetters(['isLoggedIn']),
    },
    created() {
      this.reloadState();
      this.axios.defaults.headers = { Authorization: `Bearer ${this.token}` };
    },
  };
</script>

<style>
  html {
    scroll-behavior: smooth;
  }
  .contenedor {
    min-height: calc(100vh - 180px);
  }

  img{
    max-width: 100%;
  }
</style>