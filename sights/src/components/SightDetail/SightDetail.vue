<template lang="html">
  <div id="dashboard">
    <spinner v-if='loading' text='Loading Sight' />
    <dashboard v-show='!loading'/>
    <transition name='sidebar'>
      <sidebar ref='sidebar' @edited='edited = true' @reload-sight='reloadSight' v-show='sidebarOpen || sidebarType !== "guest"'/>
    </transition>
  </div>
</template>

<script>
import { SIGHT_INACTIVE, SIGHT_ACTIVE } from '@/store/actions/sight';
import { DETAIL_SIDEBAR, DETAIL_SIDEBARTYPE } from '@/store/actions/detail';
import SightService from '@/services/SightService';
import Spinner from '@/components/Spinner/Spinner';
import Dashboard from '../Dashboard/Dashboard';
import Sidebar from './DetailSidebar';

export default {
  data() {
    return {
      loading: true,
      sight: {},
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
        this.$store.commit(DETAIL_SIDEBAR);
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
  computed: {
    sidebarType: {
      get() { return this.$store.getters.sidebarType; },
      set(value) { this.$store.commit(DETAIL_SIDEBARTYPE, value); },
    },
    sidebarOpen: {
      get() { return this.$store.getters.sidebarOpen; },
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
  beforeCreate() {
    if (this.$route.name === 'EditSight') {
      this.$store.commit(DETAIL_SIDEBARTYPE, 'edit');
    } else {
      this.$store.commit(DETAIL_SIDEBARTYPE, 'guest');
    }
  },
  beforeRouteLeave(to, from, next) {
    if (!this.edited) {
      if (to.name !== 'EditSight' && to.name !== 'SightDetail') {
        this.$store.dispatch(SIGHT_INACTIVE);
      }
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
  overflow: hidden;

  @media only screen and (max-width: 1200px) {
    flex-direction: column-reverse;
  }

  & > *{
    &:first-child{
      flex: 1 1 auto
    }

    &:nth-child(2){
      flex: 0 0 20vw;
      transition: margin 0.5s ease;
      @media only screen and (max-width: 1200px) {
        flex: 0 0 auto;

      }
    }
  }

  .sidebar-enter-active, .sidebar-leave-active {
    transition: all 0.5s ease-out;
  }

  .sidebar-enter, .sidebar-leave-to {
    // transform: translateX(100%);
    margin-right: -20vw;
    @media only screen and (max-width: 1200px) {
      margin: 0;
      margin-top: -20vw;
      opacity: 0;
    }
  }
}


</style>
