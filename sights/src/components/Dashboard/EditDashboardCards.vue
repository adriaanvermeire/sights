<template>
    <draggable v-model="draggableCards" v-bind:options="dragOptions" class='container-fluid'>
        <transition-group name='card-drag' tag='div' class='charts-grid'>
                <chart-card v-for="chart of draggableCards"
                  @remove-chart="removeChart" :chart='chart' :key='chart._id'/>
                <add-chart :key='"addChart"'/>
        </transition-group>
    </draggable>
</template>

<script>
import { SIGHT_CHARTS } from '@/store/actions/sight';
import draggable from 'vuedraggable';
import ChartCard from '@/components/Card/ChartCard';
import Notify from '@/mixins/Notifications';
import AddChart from '@/components/Card/AddChart';

export default {
  mixins: [Notify],
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
  components: {
    draggable, AddChart, ChartCard,
  },
};
</script>

<style scoped lang='scss'>

.charts-grid {
  display: grid;
  grid-gap: 1rem;
  justify-content: space-between;
  grid-auto-rows: 1fr
}

@media screen and (max-width: 40em) {
  .charts-grid {
    grid-template-columns: repeat(auto-fill, 100%);
  }
}
@media screen and (min-width: 40em) {
  .charts-grid {
    grid-template-columns: repeat(auto-fill, 48%);
  }
}

@media screen and (min-width: 60em) {
  .charts-grid {
      grid-template-columns: repeat(auto-fill, minmax(24%, 32%));
  }
}

@media screen and (min-width: 80em) {
  .charts-grid {
    grid-template-columns: repeat(auto-fill, minmax(0, 24%));
  }
}
</style>
