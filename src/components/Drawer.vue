<template>
  <div>
    <b-navbar type="dark" sticky variant="info">
      <b-container fluid>
        <i v-b-toggle.sidebar class="fas fa-bars text-white mr-3 hamburguer"></i>
        <b-navbar-brand :to="{name: 'Home'}">COVID-19 APP</b-navbar-brand>
      </b-container>
    </b-navbar>
    <b-sidebar id="sidebar" bg-variant="dark" width="230px" no-header-close shadow backdrop>
      <template #header>
        <div class="px-2 header">
          <h5 class="mt-3 font-weight-bold">Fernando Acosta</h5>
          <p class="m-0 subtitle">fernando@gmail.com</p>
        </div>
      </template>
      <hr />
      <div class="px-2 py-2">
        <router-link exact :to="{name: 'Home'}" class="nav-menu" active-class="active">
          <i class="fas fa-home"></i>
          Home
        </router-link>
        <router-link exact :to="{name: 'About'}" class="nav-menu" active-class="active">
          <i class="far fa-question-circle"></i>
          About
        </router-link>
        <div class="tree-menu">
          <a v-b-toggle.collapse-1 class="nav-menu" active-class="active">
            <i class="fas fa-list"></i>
            Tree Menu
          </a>
          <b-collapse id="collapse-1" class="tree-menu-collapse">
            <router-link exact to="/pagina1" class="nav-menu" active-class="active">
              <i class="far fa-question-circle"></i>
              Pagina 1
            </router-link>
            <router-link exact to="/pagina2" class="nav-menu" active-class="active">
              <i class="fas fa-sign-in-alt"></i>
              Pagina 2
            </router-link>
          </b-collapse>
          <router-link exact to="/login" class="nav-menu" active-class="active">
            <i class="fas fa-sign-out-alt"></i>
            Salir
          </router-link>
        </div>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
  export default {
    name: 'Drawer',
  };
</script>

<style scoped>
  .hamburguer {
    font-size: 20px;
  }
  .hamburguer:active {
    transform: scale(0.8);
  }
  .header {
    color: white;
  }
  .header .subtitle {
    color: rgba(241, 241, 241, 0.6);
  }
  .nav-menu {
    margin-bottom: 0.2rem;
    padding: 0.5rem 0rem 0.5rem 1rem;
    display: block;
    text-decoration: none;
    color: rgb(43, 43, 43);
    color: white;
  }
  .nav-menu i {
    margin-right: 20px;
  }
  .nav-menu:hover {
    background-color: rgba(173, 173, 173, 0.2);
  }
  .subtitle {
    font-size: 0.9rem;
  }
  .tree-menu-collapse {
    margin-left: 18px;
  }
</style>