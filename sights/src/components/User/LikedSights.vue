<template lang="html">
<div id="liked" class='container-fluid'>
    <h2>Liked Sights</h2>
    <div class="sights-grid" v-if='likes.length'>
      <sight-card
        v-for="sight of likes" :key='sight._id'
        :sight="sight"/>
    </div>
    <div class="text-card" v-else>
      You haven't liked any Sights yet! Explore some <router-link :to="{ name: 'Explore' }">here</router-link>.
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
@import '@/assets/scss/vars.scss';
#liked {
    display: flex;
    flex-direction: column;
    text-align: left;

  .text-card {
    padding: 1em 0.5em;
    margin: 1em 0;
    background-color: $light;
    box-shadow: 0 0 2px 0 rgba(43,49,63,.14), 0 3px 5px 0 rgba(43,49,63,.06);
    display: inline;
  }
}
</style>
