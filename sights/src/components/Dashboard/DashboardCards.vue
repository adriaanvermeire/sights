<template>
    <div class='container-fluid'>
        <div class='charts-grid'>
            <template  v-for="chart of draggableCards">
                <univariate-card
                  v-if='chart.univariate' :chart='chart' :key='chart._id'/>
                <bivariate-card
                  v-if='!chart.univariate' :chart='chart' :key='chart._id'/>
            </template>
        </div>
    </div>
</template>

<script>
import { SIGHT_CHARTS } from '@/store/actions/sight';
import UnivariateCard from '@/components/Card/UnivariateCard';
import BivariateCard from '@/components/Card/BivariateCard';

export default {
  components: {
    UnivariateCard, BivariateCard,
  },
  computed: {
    sidebarOpen() {
      return this.$store.getters.sidebarOpen;
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

.charts-grid {
  display: grid;
  grid-gap: 1rem;
  justify-content: space-between;
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
