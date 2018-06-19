<template lang="html">
  <div id="dashboard">
    <spinner v-if='loading' text='Loading Sight' />
    <dashboard @toggle-sidebar='toggleSidebar' v-show='!loading'/>
    <transition name='sidebar'>
      <sidebar ref='sidebar' @edited='edited = true' @reload-sight='reloadSight' :type='type' v-show='sidebar || type==="edit"'/>
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
  props: ['type'],
  data() {
    return {
      loading: true,
      sight: {},
      sidebar: false,
      edited: false,
    };
  },
  methods: {
    async loadSight() {
      const id = this.$route.params.id;
      return (await SightService.getSight(id)).data;
    },
    toggleSidebar() {
      if (!this.edited) {
        this.sidebar = !this.sidebar;
      } else {
        this.$refs.sidebar.$refs.editSidebar.showEditMessage();
      }
    },
    async reloadSight() {
      this.edited = false;
      this.sight = await this.loadSight();
      await this.$store.dispatch(SIGHT_ACTIVE, { sight: this.sight });
      this.$refs.sidebar.$refs.editSidebar.resetDone();
    },
  },
  async created() {
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
    if (!this.edited) {
      this.$store.dispatch(SIGHT_INACTIVE);
      next();
    } else {
      this.$refs.sidebar.$refs.editSidebar.showEditMessage();
    }
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
