<template>
  <div id="app">
    <Navbar :name="$route.name" :isLoggedIn="isLoggedIn" />
    <b-container>
      <router-view />
    </b-container>
    <Footer />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
  import Footer from './components/Footer';
  import Navbar from './components/Navbar';

  export default {
    components: {
      Footer,
      Navbar,
    },
    methods: {
      ...mapActions(['cerrarSesion', 'leerToken'])
    },
    computed: {
      ...mapState(['usuario']),
      isLoggedIn(){
        return this.usuario.rol !== ""
      }
    },
    created(){
      this.leerToken();
    }
  };
</script>