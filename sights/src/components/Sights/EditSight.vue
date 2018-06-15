<template>
    <div>

    </div>
</template>

<script>
import SightService from '@/services/SightService';

export default {
  data() {
    return {
      sight: {},
    };
  },
  methods: {
    async loadSight() {
      try {
        const response = await SightService.getSight(this.id);
        console.log(response);
      } catch (err) {
        throw err;
      }
    },
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  async mounted() {

  },
};
</script>

<style scoped>

</style>
