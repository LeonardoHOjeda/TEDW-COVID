<template>
  <div class="mt-5">
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
    </div>

    <div class="row">
      <div class="col-md-4">
        <router-link to="/admin/usuarios">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                <i class="fas fa-user"></i>Usuarios
              </h5>
              <p
                class="card-text"
              >Accede a un listado de todos los usuarios registrados en el sistema. Podrás borrarlos, inhabilitarlos o actualizar su información, como la contraseña o el email</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {};
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