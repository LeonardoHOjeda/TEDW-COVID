<template>
  <div id="app">
    <Navbar :name="$route.name" :isLoggedIn="isLoggedIn" />
    <div class="contenedor">
      <b-container>
        <router-view />
      </b-container>
    </div>
    <Footer />
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
      ...mapState(['usuario']),
      ...mapGetters(['isLoggedIn']),
    },
    created() {
      this.reloadState();
    },
  };
</script>

<style>
  .contenedor {
    min-height: calc(100vh - 180px);
  }
</style>