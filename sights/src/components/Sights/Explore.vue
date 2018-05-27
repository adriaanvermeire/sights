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
  methods: {
    loadSights() {
      SightService.getFeaturedSights()
        .then(res => res.data)
        .then((data) => { console.log(data); this.sights = data.sights; })
        .catch(e => console.log(e));
    },
  },
  created() {
    this.loadSights();
  },
};
</script>

<style lang="scss" scoped>
</style>
