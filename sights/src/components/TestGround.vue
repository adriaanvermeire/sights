<template>
    <draggable v-model="list" class='container-fluid'>
      <transition-group class='charts-grid'>
        <div class="card w-25" v-for='item of list' :key='item'>
          <div class="card-header"><h4>{{ item }}</h4></div>
          <div class="card-body d-flex flex-column justify-content-between">
              <div class="card-text">
                  {{ item }}
              </div>
          </div>
        </div>
      </transition-group>
    </draggable>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6, 7],
    };
  },
  components: { draggable },
};
</script>

<style scoped>

.charts-grid {
  display: grid;
  grid-gap: 1rem;
  justify-content: space-between;
    grid-template-columns: repeat(auto-fill, minmax(0, 24%));
}
</style>
