<template>
<div class="dashboard container-fluid">
    <draggable v-model="draggableCards" v-bind:options="dragOptions">
        <transition-group name='card-drag' tag='div' class='row d-flex px-4 flex-sm-column flex-md-row'>
            <card :width='1' v-for="chart of draggableCards" :key="chart._id" :id="`card-${chart._id}`" class='draggable'>
                <template slot="title">
                    <h5 class='m-0' v-if='/bar|column/.test(chart.type)'>Top of {{ chart.fields[0] || 'No title' }}</h5>
                    <h5 class='m-0' v-else>{{ chart.fields[0] || 'No title' }}</h5>
                </template>
                <template slot="subtitle" v-if='/bar|column/.test(chart.type)'>
                    Showing the most occurring values for <i>{{ chart.fields[0] }}</i>.
                </template>
                <template slot="actions">
                    <div class="action">
                        <button @click='toggleCardInfo(chart._id)' class='btn btn-link info-btn py-0'>
                            <icon name='info-circle'/>
                        </button>
                    </div>
                </template>
                <pick-chart :chart='chart'/>
                <template slot="dragOverlay">
                    <icon name='regular/chart-bar' scale='4'></icon>
                    <h5>Move chart</h5>
                </template>
                <template slot="infoOverlay">
                    This chart is about the {{ chart.fields.join('and') }} field(s).
                </template>
            </card>
        </transition-group>
    </draggable>
</div>
</template>

<script>
import { SIGHT_CHARTS } from '@/store/actions/sight';
import { SIDEBAR_SHOW, SIDEBAR_HIDE } from '@/store/actions/sidebar';
import draggable from 'vuedraggable';
import Card from './Card';
import PickChart from '../Charts/PickChart';

export default {
  props: ['cards'],
  components: {
    Card, PickChart, draggable,
  },
  methods: {
    toggleCardInfo(id) {
      const card = document.getElementById(`card-${id}`);
      card.classList.toggle('info-active');
    },
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
        return this.cards;
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
@import '@/assets/scss/vars.scss';

.btn-drag {
    cursor:move;
}

.sortable-chosen .card-body {
    opacity: 0.5;
    border: 3px solid $green;
}

.card-drag-move{
  transition: transform 0.5s;
}

.action .btn-link {
    color: $gray;
    transition: all 0.1s ease-in-out;
    &:hover {
        color: $black;
    }
}
</style>
