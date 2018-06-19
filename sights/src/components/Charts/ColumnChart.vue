<script>
import { Bar } from 'vue-chartjs';
import ChartMixin from '@/mixins/ChartMixin';

export default {
  extends: Bar,
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
        yAxes: [{
          ticks: {
            beginAtZero: true,
            max: 100,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        callbacks: {
          label(item, data) {
            const { index } = item;
            const datas = data.datasets[0].data;
            const { labels } = data;
            return `${labels[index]}: ${datas[index].y}%`;
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
