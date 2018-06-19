<template>
    <div id="dashboard-wrapper">
        <dashboard-meta-banner />
        <dashboard-cards v-if='sidebarType !== "edit"' />
        <edit-dashboard-cards v-else/>
    </div>
</template>

<script>
import { DETAIL_SIDEBARTYPE } from '@/store/actions/detail';
import DashboardCards from './DashboardCards';
import EditDashboardCards from './EditDashboardCards';
import DashboardMetaBanner from './DashboardMetaBanner';

export default {
  computed: {
    sidebarType: {
      get() { return this.$store.getters.sidebarType; },
      set(value) { this.$store.commit(DETAIL_SIDEBARTYPE, value); },
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
