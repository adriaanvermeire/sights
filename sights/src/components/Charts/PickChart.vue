<template>
    <div :id="`chart-${chart._id}`">
      <bar-chart
        v-if='type == "bar" && chart.univariate'
        :data='dataOne.relativeCounts'
        :field='dataOne.name' :height='300'/>
      <column-chart
        v-else-if='type == "column" && chart.univariate'
        :data='dataOne.relativeCounts'
        :field='dataOne.name' :height='300'/>
      <pie-chart
        v-else-if='type == "pie" && chart.univariate'
        :data='dataOne.relativeCounts'
        :field='dataOne.name' :height='300'/>
      <line-chart
        v-else-if='/line|area/.test(type) && chart.univariate'
        :data='dataOne.counts'
        :field='dataOne.name' :height='300'/>
    </div>
</template>

<script>
import BarChart from '@/components/Charts/BarChart';
import ColumnChart from '@/components/Charts/ColumnChart';
import PieChart from '@/components/Charts/PieChart';
import LineChart from '@/components/Charts/LineChart';

export default {
  data() {
    return {
      type: '',
      dataOne: {},
    };
  },
  computed: {
    library() {
      return {
        chart: {
        },
      };
    },
  },
  props: ['chart'],
  mounted() {
    this.type = this.chart.type;
    this.dataOne = this.chart.data[0];
  },
  components: {
    BarChart,
    ColumnChart,
    LineChart,
    PieChart,
  },
};
</script>

<style scoped>

</style>
