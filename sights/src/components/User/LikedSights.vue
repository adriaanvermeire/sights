<template lang="html">
<div id="liked" class='container-fluid'>
    <h2>Liked Sights</h2>
    <div class="sights-grid">
      <sight-card
        v-for="sight of likes" :key='sight._id'
        :sight="sight"/>
    </div>
</div>
</template>

<script>
import SightCard from '@/components/Card/SightCard';

export default {
  computed: {
    likes() {
      return this.$store.state.user.profile.likes.map(d => ({
        name: d.name,
        author: d.author.username,
        category: d.category.name,
        likes: d.likes,
        likeCount: d.likes.length,
        objectID: d._id,
      }));
    },
  },
  components: { SightCard },
};
</script>

<style lang="scss" scoped>
#liked {
    display: flex;
    flex-direction: column;
    text-align: left;
}
</style>
