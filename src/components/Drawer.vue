<template>
  <div>
    <b-navbar type="dark" sticky variant="info">
      <b-container fluid>
        <i v-b-toggle.sidebar class="fas fa-bars text-white mr-3 hamburguer"></i>
        <b-navbar-brand :to="{name: 'Home'}">
          <img src="../assets/logo.png" width="50%" />
        </b-navbar-brand>
      </b-container>
    </b-navbar>
    <b-sidebar id="sidebar" bg-variant="dark" width="230px" no-header-close shadow backdrop>
      <!-- Nombre y correo del usuario -->
      <template #header v-if="token">
        <div class="px-2 header">
          <h5 class="mt-3 font-weight-bold">{{`${infoUsuario.nombre} ${infoUsuario.a_paterno}`}}</h5>
          <p class="m-0 subtitle">{{`${usuario.email}`}}</p>
        </div>
      </template>
      <hr />
      <!-- Empieza la navegacion -->
      <div class="px-2 py-2">
        <div v-for="(menu, i) in menus" :key="i">
          <router-link v-if="menu.to" exact :to="menu.to" class="nav-menu" active-class="active">
            <i :class="menu.icon"></i>
            {{menu.label}}
          </router-link>
          <div v-else class="tree-menu">
            <a v-b-toggle="`collapse-${i}`" class="nav-menu" active-class="active">
              <i :class="menu.icon"></i>
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
        <a @click="cerrarSesion()" class="nav-menu text-danger puntero" active-class="active">
          <i class="fas fa-sign-out-alt"></i>
          Salir
        </a>
      </div>
      <!-- Termina navegacion -->
    </b-sidebar>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex';
  export default {
    name: 'Drawer',
    data: () => ({
      student_menu: [
        { icon: 'fas fa-poll-h', to: '/students/Form', label: 'Contestar Formulario' },
        {
          icon: 'fas fa-user-md',
          to: '/students/Appointment',
          label: 'Crear Cita',
        },
        {
          icon: 'far fa-file-alt',
          to: '/students/PrintRecipe',
          label: 'Historial Recetas',
        },
        {
          icon: 'fas fa-exclamation-circle',
          to: '/students/Alertas',
          label: 'Alertas',
        },
        {
          icon: 'fas fa-virus',
          to: '/students/Ordenes',
          label: 'Ordenes de pruebas',
        },
      ],
      admin_menu: [
        { icon: 'fas fa-home', to: '/admin/home', label: 'Home' },
        {
          icon: 'fas fa-building',
          to: '/admin/departamentos',
          label: 'Departamentos',
        },
        {
          icon: 'fas fa-book-reader',
          to: '/admin/carreras',
          label: 'Carreras',
        },
        {
          icon: 'fas fa-user-graduate',
          to: '/admin/estudiantes',
          label: 'Estudiantes',
        },
        {
          icon: 'fas fa-user-friends',
          to: '/admin/personal',
          label: 'Personal Académico',
        },
        {
          icon: 'fas fa-user-md',
          to: '/admin/medicos',
          label: 'Médicos',
        },
        {
          icon: 'fas fa-book-medical',
          to: '/admin/tipo_prueba',
          label: 'Tipos de Prueba',
        },
        {
          icon: 'fas fa-prescription-bottle-alt',
          to: '/admin/medicamentos',
          label: 'Medicamentos',
        },
        {
          icon: 'fas fa-chart-bar',
          label: 'Reportes',
          submenus: [
            {
              icon: 'far fa-question-circle',
              to: '/reportes/casos_detectados',
              label: 'Casos detectados',
            },
            {
              icon: 'far fa-question-circle',
              to: '/reportes/total_casos',
              label: 'Total de Casos',
            },
            {
              icon: 'far fa-question-circle',
              to: '/reportes/total_encuestas',
              label: 'Total de Encuestas',
            },
            {
              icon: 'far fa-question-circle',
              to: '/reportes/total_consultas',
              label: 'Total de Consultas',
            },
          ],
        },
      ],
      medic_menu: [
        { icon: 'fas fa-poll-h', to: '/medics/Form', label: 'Respuestas' },
        { icon: 'fas fa-user-md', to: '/medics/Consultas', label: 'Consultas' },
        {
          icon: 'fas  fa-file-medical',
          to: '/medics/Ordenes',
          label: 'Ordenes',
        },
      ],
      director_menu: [
        { icon: 'fas fa-home', to: '/director/home', label: 'Home' },
        {
          icon: 'fas fa-chart-pie',
          to: '/director/dashboard',
          label: 'Dashboard',
        },
        {
          icon: 'fas fa-chart-bar',
          label: 'Reportes',
          submenus: [
            {
              icon: 'far fa-question-circle',
              to: '/reportes/casos_detectados',
              label: 'Casos detectados',
            },
            {
              icon: 'far fa-question-circle',
              to: '/reportes/total_casos',
              label: 'Total de Casos',
            },
            {
              icon: 'far fa-question-circle',
              to: '/reportes/total_encuestas',
              label: 'Total de Encuestas',
            },
            {
              icon: 'far fa-question-circle',
              to: '/reportes/total_consultas',
              label: 'Total de Consultas',
            },
          ],
        },
      ],
      monitor_menu: [
        { icon: 'fas fa-poll-h', to: '/monitor/Alerta', label: 'Enviar Alerta' },
        {
          icon: 'fas fa-user-md',
          to: '/monitor/Trazabilidad',
          label: 'Trazar Personas',
        },
      ],
    }),
    computed: {
      menus() {
        const items = {
          estudiante: this.student_menu,
          medico: this.medic_menu,
          administrador: this.admin_menu,
          directivo: this.director_menu,
          monitor: this.monitor_menu,
        };
        return items[this.usuario.rol.rol];
      },
      ...mapState(['usuario', 'token']),
      ...mapGetters(['infoUsuario']),
    },
    methods: {
      ...mapActions(['cerrarSesion']),
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
    margin-right: 10px;
  }
  .nav-menu:hover {
    background-color: rgba(173, 173, 173, 0.2);
  }
  .nav-menu .fa-chevron-left {
    font-size: 13px;
    margin-top: 5px;
  }
  .nav-menu.not-collapsed .fa-chevron-left {
    transform: rotate(-90deg);
  }
  .subtitle {
    font-size: 0.9rem;
  }
  .tree-menu-collapse {
    margin-left: 18px;
  }

  .puntero {
    cursor: pointer;
  }

  .puntero:hover {
    color: rgb(250, 58, 58) !important;
  }
</style>