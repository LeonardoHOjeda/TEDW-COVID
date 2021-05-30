<template>
  <div id="app">
    <Navbar :name="$route.name" :isLoggedIn="false" />
    <b-container>
      <router-view />
    </b-container>
    <Footer />
  </div>
</template>

<script>
  import Footer from './components/Footer';
  import Navbar from './components/Navbar';

  export default {
    components: {
      Footer,
      Navbar,
    },
  };
</script>