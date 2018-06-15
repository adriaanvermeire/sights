<template lang="html">
<div id="mysights" class='container-fluid'>
  <section id="mine">
    <h2>My Sights</h2>
    <div class="sights-grid">
      <sight-card
        v-for="sight of sights" :key='sight._id'
        :sight="sight"/>
    </div>
  </section>
  <section id="liked">
    <h2>Liked Sights</h2>
    <div class="sights-grid">
      <sight-card
        v-for="sight of likes" :key='sight._id'
        :sight="sight"/>
    </div>
  </section>
</div>
</template>

<script>
import SightService from '@/services/SightService';
import SightCard from '@/components/Card/SightCard';

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
        }));
      } catch (err) {
        throw err;
      }
    },
  },
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
  async mounted() {
    this.loadSights();
    this.loadLikes();
  },
  components: { SightCard },
};
</script>

<style lang="scss" scoped>
#mysights {
  display: flex;
  flex-direction: column;

  #mine, #liked {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-top: 1em;
  }
}
</style>
