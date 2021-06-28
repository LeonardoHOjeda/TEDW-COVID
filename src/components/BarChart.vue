<script>
  import { Bar } from 'vue-chartjs';

  export default {
    extends: Bar,
    data: () => ({
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
    }),
    props: {
      chartdata: {
        type: Object,
        default: null,
      },
    },
    mounted() {
      this.renderChart(this.chartdata, this.options);
    },
  };
</script>