<template>
<div class="dashboard container-fluid">
    <draggable v-model="draggableCards" v-bind:options="dragOptions" :move='onMove'>
        <transition-group name='card-drag' tag='div' class='row d-flex px-4'>
            <card :width='1' v-for="chart of draggableCards" :key="chart._id" class='draggable'>
                <template slot="title">
                    <h2>{{ chart.fields[0] || 'No title' }}</h2>
                </template>
                <template slot="actions">
                    <div class="action">
                        <button @click='toggleSidebar(chart._id)' class='btn btn-link'>
                            <icon name='info-circle' color='black'/>
                        </button>
                    </div>
                </template>
                <chart :chart='chart'/>
                <div class="card-overlay">
                    <div class="overlay-content d-flex justify-content-center align-items-center flex-column">
                        <icon name='regular/chart-bar' scale='4'></icon>
                        <h5>Move chart</h5>
                    </div>
                </div>
            </card>
        </transition-group>
    </draggable>
</div>
</template>

<script>
import { SIGHT_CHARTS } from '@/store/actions/sight';
import draggable from 'vuedraggable';
import Card from './Card';
import Chart from '../Charts/Chart';
import Page from './DashboardPage';

export default {
  data() {
    return {
      sidebarOpen: false,
      sidebarContent: {},
    };
  },
  props: ['cards'],
  components: {
    Card, Chart, draggable,
  },
  methods: {
    toggleSidebar(id) {
      console.log(`Clicked chart with id: ${id}`);
      this.sidebarOpen = !this.sidebarOpen;
      this.sidebarContent = id;
    },
    onMove(e) {
      console.log(e);
    },
  },
  computed: {
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
      };
    },
  },
};
</script>

<style scoped lang='scss'>
.draggable {
    cursor: pointer;
}
.sortable-chosen .card-body {
    opacity: 0.5;
    border: 3px solid #09eba7;
}
.card-drag-move{
  transition: transform 0.5s;
}

.card-overlay {
    display: none;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    transition: all 1s ease-in-out;
}

.overlay-content {
    color: white;
    height: 100%;
}

.sortable-chosen .card-overlay {
    display: block;
    background-color: #09eba7;
}
</style>
