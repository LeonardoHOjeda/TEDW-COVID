<template>
  <Drawer v-if="isLoggedIn" />
  <b-navbar v-else toggleable="md" type="dark" sticky variant="info">
    <b-container fluid>
      <b-navbar-brand :to="{name: 'Home'}">COVID-19 APP</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/login">Login</b-nav-item>
          <b-nav-item to="/signup">Signup</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
  import Drawer from './Drawer.vue';
  export default {
    components: {
      Drawer,
    },
    name: 'Navbar',
    props: {
      isLoggedIn: { type: Boolean, default: false },
    },
  };
</script>

<style scoped>

</style>