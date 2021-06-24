<template>
  <div id="app">
    <Navbar :name="$route.name" :isLoggedIn="isLoggedIn" />
    <div style="min-height:100vh">
      <router-view />
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

  img {
    max-width: 100%;
  }
</style>