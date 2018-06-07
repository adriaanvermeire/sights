<template lang="html">
  <dashboard/>
</template>

<script>
import { SIGHT_INACTIVE, SIGHT_ACTIVE } from '@/store/actions/sight';
import SightService from '@/services/SightService';
import Dashboard from '../Dashboard/Dashboard';
import Sidebar from '../Partials/Sidebar';

export default {
  computed: {
    sight: {
      get() {
        return this.$store.state.sight.active;
      },
    },
    showSidebar: {
      get() {
        return this.$store.state.sidebar.open;
      },
    },
  },
  async mounted() {
    const id = this.$route.params.id;
    const sight = (await SightService.getSight(id)).data;
    await this.$store.dispatch(SIGHT_ACTIVE, { sight });
  },
  components: {
    Dashboard,
    Sidebar,
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch(SIGHT_INACTIVE);
    next();
  },
};
</script>

<style lang="scss" scoped>
</style>
