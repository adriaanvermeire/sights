<template>
    <div id="dashboard-wrapper">
        <dashboard-meta-banner @toggle-sidebar='toggleSidebar' />
        <dashboard-cards />
    </div>
</template>

<script>
import DashboardCards from './DashboardCards';
import DashboardMetaBanner from './DashboardMetaBanner';

export default {
  methods: {
    toggleSidebar() {
      this.$emit('toggle-sidebar');
    },
  },
  components: {
    DashboardCards,
    DashboardMetaBanner,
  },
};
</script>

<style scoped lang='scss'>
#dashboard-wrapper {
    margin-top: 1em;
    overflow-y: auto;
    transition: all 0.5s ease-out;
}
#dashboard {
    display: flex;
    flex-flow: column;

    div:nth-child(2) {
        flex: 1;
    }
}
</style>
