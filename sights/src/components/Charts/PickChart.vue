<template>
    <div :id="`chart-${chartData._id}`">
      <bar-chart
        v-if='chartData.type == "bar"'
        :data='chartData.data.relativeCounts'
        :field='chartData.data.name'
        :height="300"/>
      <column-chart
        v-if='chartData.type == "column"'
        :data='chartData.data.relativeCounts'
        :field='chartData.data.name'
        :height="300"/>
      <line-chart
        v-if='chartData.type == "line"'
        :data='chartData.data.counts'
        :field='chartData.data.name'
        :height="300"/>
    </div>
</template>

<script>
import BarChart from '@/components/Charts/BarChart';
import ColumnChart from '@/components/Charts/ColumnChart';
import LineChart from '@/components/Charts/LineChart';

export default {
  data() {
    return {
      chartData: {},
    };
  },
  computed: {
    library() {
      return {
        elements: { point: { radius: this.chartData.markers ? 3 : 0, hitRadius: 10, hoverRadius: 4 } },
        chart: {
        },
      };
    },
  },
  props: ['chart'],
  mounted() {
    this.chartData = this.chart;
    console.log(this.chartData);
  },
  components: {
    BarChart,
    ColumnChart,
    LineChart,
  },
};
</script>

<style scoped>

</style>
