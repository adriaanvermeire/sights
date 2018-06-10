<template lang="html">
  <div id="explore" class='container-fluid mx-auto'>
    <ul id='categories' class='d-flex'>
      <li class='text-muted'>Categories:</li>
      <li class="category nav-item"><button class="btn btn-outline-dark">Test</button></li>
    </ul>
    <template v-show='!loading'>
      <div class="sights-wrapper row">
        <sight-card v-for='sight in sights' :key='sight._id' :sight='sight'/>
        <p v-if="!sights.length">
          There are no Sights to be found!
        </p>
      </div>
    </template>
  </div>
</template>

<script>
import SightService from '@/services/SightService';
import CategoryService from '@/services/CategoryService';
import SightCard from '@/components/Card/SightCard';

export default {
  data() {
    return {
      sights: [],
      loading: true,
      categories: [],
    };
  },
  methods: {
    async loadSights() {
      try {
        const response = (await SightService.getFeaturedSights()).data;
        this.sights = response.sights;
      } catch (err) {
        console.log(err);
      }
    },
    async loadCategories() {
      try {
        const response = (await CategoryService.all()).data;
        this.categories = response.categories;
      } catch (err) {
        console.log(err);
      }
    },
  },
  async created() {
    await this.loadSights();
    await this.loadCategories();
    this.loading = false;
  },
  components: {
    SightCard,
  },
};
</script>

<style lang="scss" scoped>
#categories {
  list-style-type: none;
  align-items: center;

  li {
    margin-right: 1rem;
  }
}
</style>
