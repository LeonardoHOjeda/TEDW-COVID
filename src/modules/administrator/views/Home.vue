<template>
  <b-container class="mt-5">
    <h3 class="mb-4">Panel de Administración</h3>
    <div class="row">
      <div class="col-md-4">
        <router-link to="/admin/departamentos">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                <i class="fas fa-building"></i>
                Departamentos
              </h5>
              <p
                class="card-text"
              >Accede a un listado de todos los departamentos de ITC. Podrás gestionarlos, borrarlos o agregar nuevos</p>
            </div>
          </div>
        </router-link>
      </div>
      <div class="col-md-4">
        <router-link to="/admin/carreras">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                <i class="fas fa-book-reader"></i>
                Carreras
              </h5>
              <p
                class="card-text"
              >Accede a un listado de todos las carreras de ITC. Podrás gestionarlas, borrarlas o agregar nuevas</p>
            </div>
          </div>
        </router-link>
      </div>
      <div class="col-md-4">
        <router-link to="/admin/estudiantes">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                <i class="fas fa-user-graduate"></i>Estudiantes
              </h5>
              <p
                class="card-text"
              >Accede a un listado de todos los estudiantes registrados. Podrás actualizar su información personal así como su usuario</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4">
        <router-link to="/admin/personal">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                <i class="fas fa-user-friends"></i>Personal Académico
              </h5>
              <p
                class="card-text"
              >Accede a un listado de todos el personal registrado en la aplicación. Podrás actualizar su información personal así como su usuario</p>
            </div>
          </div>
        </router-link>
      </div>
      <div class="col-md-4">
        <router-link to="/admin/medicos">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                <i class="fas fa-user-md"></i>Médicos
              </h5>
              <p
                class="card-text"
              >Accede a un listado de todos los médicos registrados en la aplicación. Podrás actualizar su información personal así como su usuario</p>
            </div>
          </div>
        </router-link>
      </div>
      <div class="col-md-4">
        <router-link to="/admin/tipo_prueba">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                <i class="fas fa-book-medical"></i>Tipos de Prueba
              </h5>
              <p
                class="card-text"
              >Gestiona los tipos de Prueba de Covid 19 que el médico es capaz de ordenar</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4">
        <router-link to="/admin/medicamentos">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                <i class="fas fa-prescription-bottle-alt"></i>Medicamentos
              </h5>
              <p class="card-text">Gestiona los medicamentos que un médico puede preescribir</p>
            </div>
          </div>
        </router-link>
      </div>

      <div class="col-md-4" v-b-modal.modal-1>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              <i class="fas fa-prescription-bottle-alt"></i>Modalidad de la Prueba
            </h5>
            <p
              class="card-text"
            >Cambia la modalidad de la prueba de Covid-19 para los estudiantes y el personal, para que sea obligatoria, volutaria o aleatoria.</p>
          </div>
        </div>

        <b-modal
          id="modal-1"
          title="Modalidad de la encuesta"
          cancel-title="Cancelar"
          ok-title="Aceptar"
          centered
          @ok="handleOk"
          size="sm"
        >
          <b-select :options="modalidades" v-model="modalidad"></b-select>
        </b-modal>
      </div>
    </div>
  </b-container>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  export default {
    name: 'AdminHome',
    data: () => ({
      modalidades: [
        { value: 'obligatoria', text: 'Obligatoria' },
        { value: 'voluntaria', text: 'Voluntaria' },
        { value: 'aleatoria', text: 'Aleatoria' },
      ],
    }),
    computed: {
      ...mapState('admin', ['modalidad']),
      modalidad: {
        get() {
          return this.$store.state.admin.modalidad;
        },
        set(value) {
          this.$store.state.admin.modalidad = value;
        },
      },
    },
    methods: {
      ...mapActions('admin', ['getModalidad', 'changeModalidad']),
      handleOk() {
        this.changeModalidad({ modalidad: this.modalidad });
      },
    },
    created() {
      this.getModalidad();
    },
  };
</script>

<style scoped>
  .card {
    margin-top: 10px;
  }
  .card:hover {
    transform: scale(0.95);
    background-color: #17a2b8;
    cursor: pointer;
    color: whitesmoke;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  i {
    margin-right: 10px;
  }
</style>