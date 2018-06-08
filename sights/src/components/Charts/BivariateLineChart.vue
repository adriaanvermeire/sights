<script>
import { Line } from 'vue-chartjs';
import BivariateChartMixin from '@/mixins/BivariateChartMixin';

export default {
  extends: Line,
  mixins: [BivariateChartMixin],
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.labels,
      datasets: [
        {
          backgroundColor: this.bgColors,
          borderColor: this.boColors,
          data: this.dataXY,
        },
      ],
    },
    {
      legend: {
        display: false,
      },
    },
    );
  },
};
</script>
