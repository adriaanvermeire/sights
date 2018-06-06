<template>
    <div :id="`chart-${chartData._id}`">
        <line-chart
        v-if="chartData.type === 'line'"
        :data="chartData.data.counts"
        :xtitle="chartData.data.name" ytitle="Amount"
        :library='{
            elements: { point: { radius: chartData.markers? 3 : 0, hitRadius: 10, hoverRadius: 4 } }
            }'></line-chart>
        <column-chart
            suffix="%" v-if="chartData.type === 'column'"
            :data="chartData.data.relativeCounts"
            :xtitle="chartData.data.name" ytitle="Amount" :min="0" :max="100"
            label='Amount'></column-chart>
        <bar-chart
            suffix="%" v-if="chartData.type === 'bar'"
            :data="chartData.data.relativeCounts"
            :ytitle="chartData.data.name" xtitle="Amount"
            label='Amount'></bar-chart>
        <area-chart
            v-if="chartData.type === 'area'" :data="chartData.data.counts"
            :library='{ elements: { point: { radius: chartData.markers ? 3 : 0, hitRadius: 10, hoverRadius: 4 } } }'
            :xtitle="chartData.data.name" ytitle="Amount"></area-chart>
        <scatter-chart
            v-if="chartData.type === 'scatter'" :data="chartData.data"></scatter-chart>
    </div>
</template>

<script>
export default {
  data() {
    return {
      chartData: {},
    };
  },
  props: ['chart'],
  mounted() {
    this.chartData = this.chart;
  },
};
</script>

<style scoped>

</style>
