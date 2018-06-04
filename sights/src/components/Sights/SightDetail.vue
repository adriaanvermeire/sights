<template lang="html">
<b-container fluid>
  <b-row>
    <b-col class='d-flex justify-content-between align-items-center'>
      <span></span>
      <h1>{{ sight.name }}</h1>
        <icon name='user-circle' scale="3"></icon>
    </b-col>
  </b-row>
  <b-row class='d-flex flex-wrap justify-content-center'>
    <template v-for="chart in sight.charts">
      <!-- if (index !== 0 && !(index % 3) ) -->
      <div class="card justify-content-center w-25 m-3 p-2"  :key="chart._id">
        <h2># of {{ chart.fields[0] }}</h2>
        <line-chart
          v-if="chart.type === 'line'"
          :data="chart.data.counts"
          :xtitle="chart.data.name" ytitle="Amount"
          :library='{ elements: { point: { radius: chart.markers? 3 : 0, hitRadius: 3, hoverRadius: 3 } } }'></line-chart>
        <!-- <line-chart v-if="chart.type === 'line'" :data="chart.data.counts"></line-chart> -->
        <column-chart
            suffix="%" v-if="chart.type === 'column'"
            :data="chart.data.relativeCounts"
            :xtitle="chart.data.name" ytitle="Amount" :min="0" :max="100"></column-chart>
        <bar-chart
          suffix="%" v-if="chart.type === 'bar'"
          :data="chart.data.relativeCounts"
          :ytitle="chart.data.name" xtitle="Amount"></bar-chart>
        <area-chart
          v-if="chart.type === 'area'" :data="chart.data.counts"
          :library='{ elements: { point: { radius: chart.markers ? 3 : 0, hitRadius: 3, hoverRadius: 3 } } }'
          :xtitle="chart.data.name" ytitle="Amount"></area-chart>
        <pie-chart v-if="chart.type === 'donut'"
        suffix="%" :legend="true"
        :data="chart.data.relativeCounts" :label='chart.fields[0]' :donut="true"
        ></pie-chart>
        <pie-chart v-if="chart.type === 'pie'"
        suffix="%" :legend="true"
        :data="chart.data.relativeCounts" :label='chart.fields[0]'
        ></pie-chart>
      </div>
    </template>
  </b-row>
</b-container>
</template>

<script>
import SightService from '@/services/SightService';

export default {
  data() {
    return {
      sight: {},
      gradient: {},
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    this.sight = (await SightService.getSight(id)).data;
  },
};
</script>

<style lang="scss" scoped>
</style>
