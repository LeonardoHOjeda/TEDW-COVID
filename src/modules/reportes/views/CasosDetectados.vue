<template>
  <div class="mt-4 container">
    <div class="d-flex justify-content-between mb-3">
      <h3 class="m-0">Casos Detectados</h3>
      <a
        :href="`http://localhost:3000/reportes/casos_detectados/pdf?token=${token}`"
        target="_blank"
        class="btn btn-sm btn-success"
      >
        <i class="fas fa-file-download mr-2"></i>Descargar PDF
      </a>
    </div>

    <div class="estudiantes">
      <div class="card" style="border-radius: 10px">
        <div class="card-header">
          <h4>Estudiantes: {{casosDetectados.estudiantes.length}}</h4>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Fecha de Detección</th>
                  <th scope="col">Resultado</th>
                  <th scope="col">Carrera</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in casosDetectados.estudiantes" :key="index">
                  <th scope="row">{{index + 1}}</th>
                  <td>{{row.nombre}}</td>
                  <td>{{row.fecha_deteccion}}</td>
                  <td>{{row.resultado}}</td>
                  <td>{{row.carrera}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="personal mt-4 row">
      <div class="card col-md-12" style="border-radius: 10px">
        <div class="card-header">
          <h4>Personal: {{casosDetectados.personal.length}}</h4>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Fecha de Detección</th>
                  <th scope="col">Resultado</th>
                  <th scope="col">Departamento</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in casosDetectados.personal" :key="index">
                  <th scope="row">{{index + 1}}</th>
                  <td>{{row.nombre}}</td>
                  <td>{{row.fecha_deteccion}}</td>
                  <td>{{row.resultado}}</td>
                  <td>{{row.departamento}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  export default {
    name: 'CasosDetectados',
    data: () => ({
      loaded: false,
    }),
    computed: {
      ...mapState(['token']),
      ...mapState('reportes', ['casosDetectados']),
    },
    methods: {
      ...mapActions('reportes', ['fetchCasosDetectados']),
    },
    async created() {
      this.fetchCasosDetectados();
    },
  };
</script>

<style>
</style>