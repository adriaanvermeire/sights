<script>
import { Scatter } from 'vue-chartjs';
import BivariateChartMixin from '@/mixins/BivariateChartMixin';

export default {
  extends: Scatter,
  mixins: [BivariateChartMixin],
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart({
      datasets: [
        {
          label: 'Scatter Dataset 1',
          fill: false,
          borderColor: '#f87979',
          backgroundColor: '#f87979',
          data: this.dataXY,
        },
      ],
    },
    // {
    //   legend: {
    //     display: false,
    //   },
    // },
    );
  },
};
</script>
