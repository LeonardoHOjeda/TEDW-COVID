<template>
  <div class="mt-4">
    <div class="d-flex justify-content-between mb-3">
      <h3 class="m-0">Total de Casos Detectados</h3>
      <button @click="printPage" class="btn btn-sm btn-success" id="btn_download">
        <i class="fas fa-file-download mr-2"></i>Imprimir
      </button>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="card" style="border-radius: 10px">
          <div class="card-header">Por Carrera</div>
          <div class="card-body">
            <div class="row" v-if="loaded">
              <div class="col-md-6">
                <line-chart :chartdata="chartDataCarreras" :options="options" />
              </div>
              <div class="col-md-6">
                <pie-chart :chartdata="chartDataCarreras" :options="options" />
              </div>
            </div>
            <div v-else class="text-center">
              <b-spinner variant="primary" label="Spinning"></b-spinner>
            </div>
          </div>
        </div>

        <div class="card mt-3" style="border-radius: 10px">
          <div class="card-header">Por Departamento</div>
          <div class="card-body">
            <div class="row" v-if="loaded">
              <div class="col-md-6">
                <line-chart :chartdata="chartDataDepartamentos" :options="options" />
              </div>
              <div class="col-md-6">
                <pie-chart :chartdata="chartDataDepartamentos" :options="options" />
              </div>
            </div>
            <div v-else class="text-center">
              <b-spinner variant="primary" label="Spinning"></b-spinner>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LineChart from '@/components/BarChart.vue';
  import PieChart from '@/components/PieChart.vue';
  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'TotalCasos',
    data: () => ({
      loaded: false,
      chartDataCarreras: {
        labels: [],
        datasets: [
          {
            label: 'Serie 1',
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1,
          },
        ],
      },
      chartDataDepartamentos: {
        labels: [],
        datasets: [
          {
            label: 'Serie 1',
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    }),
    components: {
      LineChart,
      PieChart,
    },
    computed: {
      ...mapState('reportes', ['totalCasos']),
    },
    methods: {
      ...mapActions('reportes', ['fetchTotalCasos', 'printPage']),
      generateColor() {
        return [
          Math.floor(Math.random() * 255),
          Math.floor(Math.random() * 255),
          Math.floor(Math.random() * 255),
        ];
      },
    },
    async created() {
      await this.fetchTotalCasos();
      this.totalCasos.carrera.forEach((item) => {
        const color = this.generateColor();
        this.chartDataCarreras.labels.push(item.carrera);
        this.chartDataCarreras.datasets[0].data.push(item.total_estudiantes);
        this.chartDataCarreras.datasets[0].backgroundColor.push(
          `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.2)`
        );
        this.chartDataCarreras.datasets[0].borderColor.push(
          `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`
        );
      });
      this.totalCasos.departamento.forEach((item) => {
        const color = this.generateColor();
        this.chartDataDepartamentos.labels.push(item.departamento);
        this.chartDataDepartamentos.datasets[0].data.push(item.total_personal);
        this.chartDataDepartamentos.datasets[0].backgroundColor.push(
          `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.2)`
        );
        this.chartDataDepartamentos.datasets[0].borderColor.push(
          `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`
        );
      });
      this.loaded = true;
    },
  };
</script>

<style>
</style>