<template>
  <div class="mt-5 container">
    <h3 class="mb-4">Menu de Inicio</h3>
    <div class="row">
      <!-- Dashboard -->
      <div class="col-md-4">
        <router-link to="/director/Dashboard">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                <i class="fas fa-key"></i>Dashboard
              </h5>
              <p class="card-text">
                Accede a una pantalla tipo
                <strong>dashboard</strong> donde podras observar la informacion mas importante
              </p>
            </div>
          </div>
        </router-link>
      </div>
      <!-- Reportes -->
      <div class="col-md-4">
        <router-link to="/reportes/casos_detectados">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                <i class="fas fa-virus"></i>Casos detectados
              </h5>
              <p class="card-text">Listado de todos los casos detectados dentro de la institución</p>
            </div>
          </div>
        </router-link>
      </div>
      <div class="col-md-4">
        <router-link to="/reportes/total_casos">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                <i class="fas fa-diagnoses"></i>Total de Casos
              </h5>
              <p
                class="card-text"
              >Gráficas con el total de casos detectados, agrupados por carrera y por departamento</p>
            </div>
          </div>
        </router-link>
      </div>
      <div class="col-md-4">
        <router-link to="/reportes/total_encuestas">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                <i class="fas fa-poll"></i>Total de Encuestas
              </h5>
              <p
                class="card-text"
              >Gráficas con el total de encuestas aplicadas a estudiantes y personal académico, agrupados por carrera y por departamento</p>
            </div>
          </div>
        </router-link>
      </div>
      <div class="col-md-4">
        <router-link to="/reportes/total_consultas">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                <i class="fas fa-prescription"></i>Total de Consultas
              </h5>
              <p class="card-text">Gráficas del todas las consultas atendidas, agupadas por médico</p>
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
    transition-property: all;
    transition-duration: 250ms;
    transition-timing-function: ease;
  }
  .card:hover {
    transform: scale(1.1);
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