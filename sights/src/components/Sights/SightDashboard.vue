<template lang="html">
  <dashboard :cards='sight.charts'>
  </dashboard>
</template>

<script>
import { SIGHT_INACTIVE, SIGHT_ACTIVE } from '@/store/actions/sight';
import SightService from '@/services/SightService';
import Dashboard from '../Partials/Dashboard';

export default {
  computed: {
    sight: {
      get() {
        return this.$store.state.sight.active;
      },
    },
  },
  async mounted() {
    const id = this.$route.params.id;
    const sight = (await SightService.getSight(id)).data;
    this.$store.dispatch(SIGHT_ACTIVE, { sight });
  },
  components: {
    Dashboard,
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch(SIGHT_INACTIVE);
    next();
  },
};
</script>

<style lang="scss" scoped>
</style>
