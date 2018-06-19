<template>
    <div id="dashboard-wrapper">
        <dashboard-meta-banner @toggle-sidebar='toggleSidebar' />
        <dashboard-cards v-if='type !== "edit"' />
        <edit-dashboard-cards v-else/>
    </div>
</template>

<script>
import DashboardCards from './DashboardCards';
import EditDashboardCards from './EditDashboardCards';
import DashboardMetaBanner from './DashboardMetaBanner';

export default {
  props: ['type'],
  methods: {
    toggleSidebar() {
      this.$emit('toggle-sidebar');
    },
  },
  components: {
    DashboardCards,
    EditDashboardCards,
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
