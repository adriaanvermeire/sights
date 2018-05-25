<template lang="html">
<b-container fluid>
  <b-row>
    <b-col class='d-flex justify-content-between align-items-center'>
      <span></span>
      <h1>{{ sight.name }}</h1>
        <icon name='user-circle' scale="3"></icon>
    </b-col>
  </b-row>
  <b-row>

  </b-row>
</b-container>
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
