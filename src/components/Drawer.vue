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
        <!-- Nombre y correo del usuario -->
        <div class="px-2 header">
          <h5 class="mt-3 font-weight-bold">Fernando Acosta</h5>
          <p class="m-0 subtitle">fernando@gmail.com</p>
        </div>
      </template>
      <hr />
      <div class="px-2 py-2">
        <div v-for="(menu, i) in menus" :key="i">
          <router-link v-if="menu.to" exact :to="menu.to" class="nav-menu" active-class="active">
            <i :class="menu.icon"></i>
            {{menu.label}}
          </router-link>
          <div v-else class="tree-menu">
            <a v-b-toggle="`collapse-${i}`" class="nav-menu" active-class="active">
              <i class="fas fa-list"></i>
              {{menu.label}}
              <i class="fas fa-chevron-left float-right"></i>
            </a>
            <b-collapse :id="`collapse-${i}`" class="tree-menu-collapse">
              <router-link
                v-for="(submenu, j) in menu.submenus"
                :key="j"
                exact
                :to="submenu.to"
                class="nav-menu"
                active-class="active"
              >
                <i :class="submenu.icon"></i>
                {{submenu.label}}
              </router-link>
            </b-collapse>
          </div>
        </div>
        <router-link exact to="/login" class="nav-menu" active-class="active">
          <i class="fas fa-sign-out-alt"></i>
          Salir
        </router-link>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
  export default {
    name: 'Drawer',
    data: () => ({
      user: { rol: 'admin' },
      student_menu: [
        { icon: 'fas fa-poll-h', to: '/students/Form', label: 'Form' },
        { icon: 'fas fa-user-md', to: '/students/Appointment', label: 'Crear Cita' },
        { icon: 'far fa-file-alt', to: '/students/PrintRecipe', label: 'Historial Recetas' },
        {
          icon: 'fas fa-list',
          label: 'Tree Menu',
          submenus: [
            { icon: 'far fa-question-circle', to: '/pagina1', label: 'Pagina 1' },
            { icon: 'far fa-question-circle', to: '/pagina2', label: 'Pagina 2' },
          ],
        },
        {
          icon: 'fas fa-list',
          label: 'Otro Tree Menu',
          submenus: [
            { icon: 'far fa-question-circle', to: '/pagina1', label: 'Pagina 1' },
            { icon: 'far fa-question-circle', to: '/pagina2', label: 'Pagina 2' },
          ],
        },
      ],
      admin_menu: [
        { icon: 'fas fa-home', to: '/', label: 'Home' },
        { icon: 'far fa-question-circle', to: '/about', label: 'About' },
        { icon: 'far fa-question-circle', to: '/signup', label: 'Registrarse' },
      ],
      medic_menu: [
        { icon: 'fas fa-poll-h', to: '/medics/Form', label: 'Formulario' },
        { icon: 'fas fa-user-md', to: '/medics/Consultas', label: 'Consultas' },
        { icon: 'fas  fa-file-medical', to: '/medics/ResultadosPruebas', label: 'Resultados Pruebas' },
        { icon: 'far fa-question-circle', to: '/about', label: 'About' },
      ],
    }),
    computed: {
      menus() {
        const items = {
          student: this.student_menu,
          admin: this.admin_menu,
          medic: this.medic_menu,
        };
        return items[this.user.rol];
      },
    },
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
  #sidebar hr {
    background-color: grey;
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
  .nav-menu .fa-chevron-left{
    font-size: 13px;
    margin-top: 5px;
  }
  .nav-menu.not-collapsed .fa-chevron-left{
    transform: rotate(-90deg);
  }
  .subtitle {
    font-size: 0.9rem;
  }
  .tree-menu-collapse {
    margin-left: 18px;
  }
</style>