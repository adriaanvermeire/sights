<template lang="html">
<div id="mysights" class='container-fluid'>
  <h2>My Sights</h2>
  <div class="expanded-sights-grid">
    <expanded-sight-card
      v-for="sight of sights" :key='sight._id'
      :sight="sight"/>
  </div>
</div>
</template>

<script>
import SightService from '@/services/SightService';
import ExpandedSightCard from '@/components/Card/ExpandedSightCard';

export default {
  data() {
    return {
      sights: [],
    };
  },
  methods: {
    async loadSights() {
      try {
        const response = await SightService.personal();
        console.log(response.data);
        this.sights = response.data.map(d => ({
          name: d.name,
          author: d.author.username,
          category: d.category.name,
          likes: d.likes,
          likeCount: d.likeCount,
          objectID: d._id,
          createdAt: d.createdAt,
          charts: d.charts.length,
          views: d.views,
          dataset: {
            name: d.dataset.originalName,
            filetype: d.dataset.mimetype,
            size: d.dataset.size,
            lastUpdated: d.dataset.updatedAt,
            path: d.dataset.path,
          },
        }));
      } catch (err) {
        throw err;
      }
    },
  },
  async mounted() {
    this.loadSights();
  },
  components: { ExpandedSightCard },
};
</script>

<style lang="scss" scoped>
#mysights {
  display: flex;
  flex-direction: column;
  text-align: left;
}
</style>
