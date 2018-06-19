<template>
    <draggable v-model="draggableCards" v-bind:options="dragOptions" class='container-fluid'>
        <transition-group name='card-drag' tag='div' class='row d-flex px-2 flex-md-row'>
            <template  v-for="(chart, i) of draggableCards">
                <univariate-card
                  @remove-chart="removeChart"
                  v-if='chart.univariate' :chart='chart' :key='chart._id'/>
                <bivariate-card
                  @remove-chart="removeChart"
                  v-if='!chart.univariate' :chart='chart' :key='chart._id'/>
                <add-chart
                  v-if='i === draggableCards.length -1' :key='`${chart._id}${i}`' />
            </template>
        </transition-group>
    </draggable>
</template>

<script>
import { SIGHT_CHARTS } from '@/store/actions/sight';
import draggable from 'vuedraggable';
import UnivariateCard from '@/components/Card/UnivariateCard';
import BivariateCard from '@/components/Card/BivariateCard';
import Notify from '@/mixins/Notifications';
import AddChart from '@/components/Card/AddChart';

export default {
  mixins: [Notify],
  components: {
    UnivariateCard, BivariateCard, draggable, AddChart,
  },
  methods: {
    removeChart(id) {
      const newCharts = this.draggableCards.filter(c => c._id !== id);
      try {
        this.draggableCards = newCharts;
        this.success('The chart was removed successfully!');
      } catch (err) {
        this.danger('Something went wrong trying to remove the chart');
      }
    },
  },
  computed: {
    sidebarOpen: {
      get() {
        return this.$store.getters.sidebarOpen;
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
