<script>
import { Line } from 'vue-chartjs';
import ChartMixin from '@/mixins/ChartMixin';

export default {
  extends: Line,
  mixins: [ChartMixin],
  props: ['data', 'field'],
  computed: {
    labels() {
      const labels = [];
      for (let i = 0; i < this.data.length; i += 1) {
        const el = this.data[i];
        labels.push(el[0]);
      }
      return labels;
    },
    chartData() {
      const data = [];
      for (let i = 0; i < this.data.length; i += 1) {
        const el = this.data[i];
        data.push(el[1]);
      }
      return data;
    },
  },
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
          data: this.chartData,
        },
      ],
    });
  },
};
</script>
