<template lang="html">
  <div id="explore" class='container-fluid mx-auto px-5 pb-5'>
    <ais-index
          app-id="OQTWW0B4H3"
          api-key="97e17abaac2e3a6bd2677c5176b7ec7d"
          index-name="sights"
          :query-parameters="categoryFilter"
      >
      <search-bar @search="searchCategory($event)"/>
      <ais-results>
        <template slot-scope="{ result }">
          <sight-card :key='result.objectID' :sight='result'/>
        </template>
      </ais-results>
    </ais-index>
  </div>
</template>

<script>
import SightCard from '@/components/Card/SightCard';
import SearchBar from './SearchBar';

export default {
  data() {
    return {
      sights: [],
      loading: true,
      filterCategory: '',
    };
  },
  methods: {
    searchCategory(payload) {
      this.filterCategory = payload.name;
    },
  },
  computed: {
    categoryFilter() {
      const filter = { filters: '' };
      if (this.filterCategory) {
        filter.filters = `category:${this.filterCategory}`;
      }
      return filter;
    },
  },
  components: {
    SightCard, SearchBar,
  },
};
</script>

<style lang="scss" scoped>
.ais-results {
  display: grid;
  grid-gap: 1rem;
  justify-content: space-between;
}
</style>

<style lang="scss">
@media screen and (max-width: 40em) {
  .ais-results {
    grid-template-columns: repeat(auto-fill, 100%);
  }
}
@media screen and (min-width: 40em) {
  .ais-results {
    grid-template-columns: repeat(auto-fill, 48%);
  }
}

@media screen and (min-width: 60em) {
  .ais-results {
      grid-template-columns: repeat(auto-fill, minmax(19%, 32%));
  }
}

@media screen and (min-width: 80em) {
  .ais-results {
    grid-template-columns: repeat(auto-fill, minmax(0, 19%));
  }
}
</style>
