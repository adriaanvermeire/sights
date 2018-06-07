<template>
    <div :id="`chart-${chartData._id}`">
      <template v-if='!dataTwo'>
        <bar-chart
          v-if='type == "bar"'
          :data='dataOne.relativeCounts'
          :field='dataOne.name'/>
        <column-chart
          v-if='type == "column"'
          :data='dataOne.relativeCounts'
          :field='dataOne.name'/>
        <line-chart
          v-if='/line|area/.test(type)'
          :data='dataOne.counts'
          :field='dataOne.name'/>
      </template>
      <bivariate-line-chart v-else
          :dataX='dataOne'
          :dataY='dataTwo'
          :fields='[dataOne.name, dataTwo.name]'/>
    </div>
</template>

<script>
import BarChart from '@/components/Charts/BarChart';
import ColumnChart from '@/components/Charts/ColumnChart';
import LineChart from '@/components/Charts/LineChart';

export default {
  data() {
    return {
      type: '',
      dataOne: {},
      dataTwo: {},
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
    this.type = this.chartData.type;
    this.dataOne = this.chartData.data[0];
    if (!this.chartData.univariate) {
      this.dataTwo = this.chartData.data[1];
    }
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
