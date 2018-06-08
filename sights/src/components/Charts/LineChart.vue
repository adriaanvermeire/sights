<script>
import { Line } from 'vue-chartjs';
import ChartMixin from '@/mixins/ChartMixin';

export default {
  extends: Line,
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
          pointRadius: this.data.markers ? 3 : 0,
          hitRadius: 10,
          hoverRadius: 4,
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
