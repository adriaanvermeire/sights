<template>
    <draggable v-model="draggableCards" v-bind:options="dragOptions" class='container-fluid'>
        <transition-group name='card-drag' tag='div' class='row d-flex px-2 flex-md-row'>
            <template  v-for="chart of draggableCards">
                <univariate-card v-if='chart.univariate' :chart='chart' :key='chart._id'/>
                <bivariate-card v-if='!chart.univariate' :chart='chart' :key='chart._id'/>
            </template>
        </transition-group>
    </draggable>
</template>

<script>
import { SIGHT_CHARTS } from '@/store/actions/sight';
import { SIDEBAR_SHOW, SIDEBAR_HIDE } from '@/store/actions/sidebar';
import draggable from 'vuedraggable';
import UnivariateCard from './UnivariateCard';
import BivariateCard from './BivariateCard';

export default {
  components: {
    UnivariateCard, BivariateCard, draggable,
  },
  methods: {
    toggleSidebar(id) {
      console.log(`Clicked chart with id: ${id}`);
      if (!this.sidebarOpen) {
        this.$store.dispatch(SIDEBAR_SHOW, { content: 'Hello this is a test' });
      } else {
        this.$store.dispatch(SIDEBAR_HIDE);
      }
    },
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
