<template lang="html">
  <ul>
    <li v-for="sight in sights" :key='sight._id'>
      <router-link
      :to="{
        name: 'SightDetail',
        params: { id: sight._id || 1 }
        }" class='text-dark'
      >{{ sight.name }}</router-link>
    </li>
  </ul>
</template>

<script>
import SightService from '@/services/SightService';

export default {
  data() {
    return {
      sights: [],
    };
  },
  created() {
    SightService.getFeaturedSights()
      .then(res => res.data)
      .then((data) => { this.sights = data.sights; });
  },
};
</script>

<style lang="scss" scoped>
</style>
