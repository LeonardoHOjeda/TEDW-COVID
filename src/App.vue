<template>
  <div id="app">
    <Navbar :name="$route.name" :isLoggedIn="true" />
    <b-container>
      <router-view />
    </b-container>
    <Footer />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
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
    created(){
      this.leerToken();
    }
  };
</script>