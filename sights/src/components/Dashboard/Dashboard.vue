<template>
    <div id="dashboard-wrapper">
        <dashboard-meta-banner />
        <dashboard-cards />
    </div>
</template>

<script>
import DashboardCards from './DashboardCards';
import DashboardMetaBanner from './DashboardMetaBanner';

export default {
  components: {
    DashboardCards,
    DashboardMetaBanner,
  },
};
</script>

<style scoped lang='scss'>
#dashboard {
    display: flex;
    flex-flow: column;

    div:nth-child(2) {
        flex: 1;
    }
}
</style>
