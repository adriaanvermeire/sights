<template lang="html">
</template>

<script>
import SightService from '@/services/SightService';

export default {
  data() {
    return {
      sight: {},
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    this.sight = (await SightService.getSight(id)).data.sight;
  },
};
</script>

<style lang="scss" scoped>
</style>
