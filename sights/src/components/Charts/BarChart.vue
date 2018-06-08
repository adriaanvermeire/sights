<script>
import { HorizontalBar } from 'vue-chartjs';
import ChartMixin from '@/mixins/ChartMixin';

export default {
  extends: HorizontalBar,
  mixins: [ChartMixin],
  props: ['data', 'field'],
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.labels,
      datasets: [
        {
          label: this.field,
          backgroundColor: this.bgColors,
          borderColor: this.boColors,
          borderWidth: 1,
          data: this.dataXY,
        },
      ],
    },
    {
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true,
          },
        }],
      },
      legend: {
        display: false,
      },
    });
  },
};
</script>
