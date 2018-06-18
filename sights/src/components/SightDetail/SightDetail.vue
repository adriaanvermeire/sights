<template lang="html">
  <div id="dashboard">
    <spinner v-if='loading' text='Loading Sight' />
    <dashboard @toggle-sidebar='sidebar = !sidebar' v-show='!loading'/>
    <transition name='sidebar'>
      <sidebar v-show='sidebar'/>
    </transition>
  </div>
</template>

<script>
import { SIGHT_INACTIVE, SIGHT_ACTIVE } from '@/store/actions/sight';
import SightService from '@/services/SightService';
import Spinner from '@/components/Spinner/Spinner';
import Dashboard from '../Dashboard/Dashboard';
import Sidebar from './DetailSidebar';

export default {
  data() {
    return {
      loading: true,
      sight: {},
      sidebar: false,
    };
  },
  methods: {
    async loadSight() {
      const id = this.$route.params.id;
      return (await SightService.getSight(id)).data;
    },
  },
  async mounted() {
    this.sight = await this.loadSight();
    this.loading = false;
    await this.$store.dispatch(SIGHT_ACTIVE, { sight: this.sight });
  },
  components: {
    Dashboard,
    Spinner,
    Sidebar,
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch(SIGHT_INACTIVE);
    next();
  },
};
</script>

<style lang="scss" scoped>
#dashboard {
  margin-top: 0;
  display: flex;
  justify-content: center;

  .sidebar-enter-active, .sidebar-leave-active {
    transition: all 0.5s ease-out;
  }

  .sidebar-enter, .sidebar-leave-to {
    // transform: translateX(100%);
    width: 0;
  }
}


</style>
