<script>
import { Pie } from 'vue-chartjs';
import ChartMixin from '@/mixins/ChartMixin';

export default {
  extends: Pie,
  mixins: [ChartMixin],
  props: ['data', 'field'],
  computed: {
    mappedData() {
      let min = Infinity;
      let max = -Infinity;
      const mapped = [];
      for (let i = 0; i < this.dataXY.length; i += 1) {
        const element = this.dataXY[i];
        if (element.y > max) max = element.y;
        if (element.y < min) min = element.y;
      }
      for (let i = 0; i < this.dataXY.length; i += 1) {
        const element = this.dataXY[i];
        mapped.push([element.x, element.y * (100 / max)]);
      }

      return mapped;
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
          data: this.dataXY.map(d => d.y),
        },
      ],
    }, {
      tooltips: {
        callbacks: {
          label(item, data) {
            const { index } = item;
            const datas = data.datasets[0].data;
            const { labels } = data;
            return `${labels[index]}: ${datas[index]}%`;
          },
          title(item, data) {
            return data.datasets[0].label;
          },
        },
      },
    });
  },
};
</script>
