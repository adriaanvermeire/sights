<template>
<card :width='1' :id="`card-${chart._id}`" :draggable="sidebarType ==='edit'" :class="{ draggable: sidebarType ==='edit'}" class='align-items-stretch d-flex'>
    <template slot="title">
        <h5 class='m-0'>Relation between {{ fields }}.</h5>
    </template>
    <template slot="actions">
        <div class="action">
            <button @click='toggleCardInfo(chart._id)' class='btn btn-link info-btn py-0'>
                <icon name='info-circle'/>
            </button>
        </div>
    </template>
    <scatter-chart :dependent='dependent' :independent='independent' />
    <template slot="dragOverlay">
        <icon name='regular/chart-bar' scale='4'></icon>
        <h5>Move chart</h5>
    </template>
    <template slot="infoTitle">
        <h6>More info on the <i>{{ fields }}</i> fields</h6>
    </template>
    <template slot="infoOverlay">
        <div id="number-info" class='d-flex justify-content-center flex-column'>

        </div>
    </template>
</card>
</template>

<script>
import ScatterChart from '@/components/Charts/ScatterChart';
import DashboardCard from './DashboardCard';

export default {
  extends: DashboardCard,
  computed: {
    dependent() {
      return this.chart.data[1][0];
    },
    independent() {
      return this.chart.data[0][0];
    },
    fields() {
      return this.chart.fields.join(' and ');
    },
  },
  created() {
    // console.log(this.chart);
  },
  components: {
    ScatterChart,
  },
};
</script>

<style scoped lang='scss'>

</style>
