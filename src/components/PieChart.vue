<script>
  import { Pie } from 'vue-chartjs';

  export default {
    extends: Pie,
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