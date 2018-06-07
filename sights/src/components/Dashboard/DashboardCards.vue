<template>
    <draggable v-model="draggableCards" v-bind:options="dragOptions">
        <transition-group name='card-drag' tag='div' class='row d-flex px-md-5 px-2 flex-md-row'>
            <card :width='1' v-for="chart of draggableCards" :key="chart._id" :id="`card-${chart._id}`" class='draggable align-items-stretch d-flex'>
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
                <template slot="infoTitle">
                    <h6>More info on the <i>{{ chart.fields[0] }}</i> field</h6>
                </template>
                <template slot="infoOverlay">
                    <div id="number-info" class='d-flex justify-content-center flex-column'>
                        <table class='table table-sm table-bordered'>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Categories</td>
                                    <td>{{ chart.data.uniqueValues }}</td>
                                </tr>
                                <tr>
                                    <td>Entries</td>
                                    <td>{{ chart.data.total }}</td>
                                </tr>
                                <tr>
                                    <td>Missing values</td>
                                    <td>{{chart.data.missing.length}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <template v-if='/number/.test(chart.data.type)'>
                        <table class='table table-sm table-bordered'>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Sum</td>
                                    <td>{{ chart.data.sum }}</td>
                                </tr>
                                <tr>
                                    <td>Minimum</td>
                                    <td>{{ chart.data.min }}</td>
                                </tr>
                                <tr>
                                    <td>Maximum</td>
                                    <td>{{ chart.data.max }}</td>
                                </tr>
                                <tr>
                                    <td>Mean</td>
                                    <td>{{ chart.data.mean }}</td>
                                </tr>
                                <tr>
                                    <td>Median</td>
                                    <td>{{ chart.data.median }}</td>
                                </tr>
                                <tr>
                                    <td>Standard deviation</td>
                                    <td>{{ chart.data.stdDeviation }}</td>
                                </tr>
                            </tbody>
                        </table>
                        </template>
                    </div>
                </template>
            </card>
        </transition-group>
    </draggable>
</template>

<script>
import { SIGHT_CHARTS } from '@/store/actions/sight';
import { SIDEBAR_SHOW, SIDEBAR_HIDE } from '@/store/actions/sidebar';
import draggable from 'vuedraggable';
import Card from '@/components/Partials/Card';
import PickChart from '../Charts/PickChart';

export default {
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

table {
    thead {
        background-color: $green;
    }
    th, td {
        border: none;
        text-align: left;
    }
}

td:first-child{
    width: 50%;
}
td:last-child {
}
</style>
