<template lang="html">
  <div id="dashboard">
    <spinner v-if='loading' text='Loading Sight' />
    <dashboard v-show='!loading' :sight='sight'/>
  </div>
</template>

<script>
import { SIGHT_INACTIVE, SIGHT_ACTIVE } from '@/store/actions/sight';
import SightService from '@/services/SightService';
import Spinner from '@/components/Spinner/Spinner';
import Dashboard from '../Dashboard/Dashboard';

export default {
  data() {
    return {
      loading: true,
      sight: {},
    };
  },
  computed: {
    showSidebar: {
      get() {
        return this.$store.state.sidebar.open;
      },
    },
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
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch(SIGHT_INACTIVE);
    next();
  },
};
</script>

<style lang="scss" scoped>
</style>
