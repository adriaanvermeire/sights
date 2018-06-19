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
        const response = await SightService.editSight(this.id);
        return response.data;
      } catch (err) {
        this.$router.push('/');
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
    this.sight = await this.loadSight();
  },
};
</script>

<style scoped>

</style>
