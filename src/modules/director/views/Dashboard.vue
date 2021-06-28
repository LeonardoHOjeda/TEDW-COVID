<template>
  <div class="container mt-3">
    <Titulos
      titulo="Dashboard"
      subtitulo="Resumen de los números de Covid-19 en el Instituto Tecnológico de Celaya"
    />
    <div class="row">
      <div class="col-md-3 col-12">
        <card-info
          :number="dashboard.numConsultas"
          description="Consultas atendidas"
          icon="fas fa-clinic-medical"
          bg="bg-info"
        />
      </div>
      <div class="col-md-3 col-12">
        <card-info
          :number="dashboard.numEncuestas"
          description="Encuestas aplicadas"
          icon="fas fa-pencil-alt"
          bg="bg-primary"
        />
      </div>
      <div class="col-md-3 col-12">
        <card-info
          :number="dashboard.numEstudiantes"
          description="Estudiantes registrados"
          icon="fas fa-user-graduate"
          bg="bg-success"
        />
      </div>
      <div class="col-md-3 col-12">
        <card-info
          :number="dashboard.numMedicos"
          description="Médicos registrados"
          icon="fas fa-user-md"
          bg="bg-secondary"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-md-3 col-12">
        <card-info
          :number="dashboard.numPersonal"
          description="Personal registrado"
          icon="fas fa-user-tie"
          bg="bg-light"
          style="color: black"
        />
      </div>
      <div class="col-md-3 col-12">
        <card-info
          :number="dashboard.numOrdenes"
          description="Pruebas de covid aplicadas"
          icon="fas fa-vials"
          bg="bg-dark"
        />
      </div>
      <div class="col-md-3 col-12">
        <card-info
          :number="dashboard.numPositivos"
          description="Casos positivos"
          icon="fas fa-radiation-alt"
          bg="bg-danger"
        />
      </div>
      <div class="col-md-3 col-12">
        <card-info
          :number="dashboard.numSospechosos"
          description="Usuarios sospechosos"
          icon="fas fa-user-secret"
          bg="bg-warning"
        />
      </div>
    </div>

    <div class="card mt-4 shadow" style="border-radius: 20px;">
      <div class="card-body">
        <line-chart
          :chartdata="chartDatacontagios"
          :options="options"
          v-if="loaded"
          style="height: 350px"
        />
      </div>
    </div>

    <div class="card mt-5 shadow" style="border-radius: 20px;">
      <div class="card-body">
        <line-chart
          :chartdata="chartDataConsultas"
          :options="options"
          v-if="loaded"
          style="height: 350px"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import Titulos from '../../../components/Titulos.vue';
  import { mapActions, mapState } from 'vuex';
  import CardInfo from './components/CardInfo.vue';
  import LineChart from '@/components/LineChart.vue';
  import moment from 'moment';
  export default {
    components: { CardInfo, Titulos, LineChart },
    data() {
      return {
        loaded: false,
        chartDataConsultas: {
          labels: [],
          datasets: [
            {
              label: 'Consultas atendidas en los últimos 30 días',
              data: [],
              borderColor: ['rgba(45,45,200)'],
              backgroundColor: ['rgba(45,45,200,0.2)'],
              borderWidth: 1,
            },
          ],
        },
        chartDatacontagios: {
          labels: [],
          datasets: [
            {
              label: 'Contagios en los últimos 30 días',
              data: [],
              borderColor: ['rgba(56,12,98)'],
              backgroundColor: ['rgba(56,12,98,0.2)'],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  stepSize: 1,
                  beginAtZero: true,
                  suggestedMax: 3,
                },
              },
            ],
          },
        },
      };
    },
    async created() {
      await this.fetchDashboard();
      Object.keys(this.consultas).forEach((fecha) => {
        this.chartDataConsultas.labels.push(fecha);
        this.chartDataConsultas.datasets[0].data.push(this.consultas[fecha]);
      });
      Object.keys(this.contagios).forEach((fecha) => {
        this.chartDatacontagios.labels.push(fecha);
        this.chartDatacontagios.datasets[0].data.push(this.contagios[fecha]);
      });
      this.loaded = true;
    },
    computed: {
      ...mapState('director', ['dashboard']),
      consultas() {
        const map = {};
        this.dashboard.consultas_last_month.forEach((row) => {
          const fecha = moment(row.fecha_atencion).format('LL');
          if (map[fecha]) map[fecha]++;
          else map[fecha] = 1;
        });
        return map;
      },
      contagios() {
        const map = {};
        this.dashboard.contagios_last_month.forEach((row) => {
          const fecha = moment(row.fecha_deteccion).format('LL');
          if (map[fecha]) map[fecha]++;
          else map[fecha] = 1;
        });
        return map;
      },
    },
    methods: {
      ...mapActions('director', ['fetchDashboard']),
      generateColor() {
        return [
          Math.floor(Math.random() * 255),
          Math.floor(Math.random() * 255),
          Math.floor(Math.random() * 255),
        ];
      },
    },
  };
</script>

<style>
</style>