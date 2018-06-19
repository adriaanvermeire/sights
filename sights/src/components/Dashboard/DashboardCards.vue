<template>
    <div class='container-fluid'>
        <div class='row d-flex px-2 flex-md-row'>
            <template  v-for="chart of draggableCards">
                <univariate-card
                  v-if='chart.univariate' :chart='chart' :type='type' :key='chart._id'/>
                <bivariate-card
                  v-if='!chart.univariate' :chart='chart' :type='type' :key='chart._id'/>
            </template>
        </div>
    </div>
</template>

<script>
import { SIGHT_CHARTS } from '@/store/actions/sight';
import UnivariateCard from '@/components/Card/UnivariateCard';
import BivariateCard from '@/components/Card/BivariateCard';

export default {
  props: ['type'],
  components: {
    UnivariateCard, BivariateCard,
  },
  computed: {
    sidebarOpen: {
      get() {
        return this.$store.state.sidebar.open;
      },
    },
    draggableCards: {
      get() {
        return this.$store.getters.sightCharts;
      },
      set(value) {
        this.$store.dispatch(SIGHT_CHARTS, { charts: value });
      },
    },
    dragOptions() {
      return {
        animation: 0,
        handle: '.btn-drag',
      };
    },
  },
};
</script>

<style scoped lang='scss'>

</style>
