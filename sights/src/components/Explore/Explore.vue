<template lang="html">
  <div id="explore" class='container-fluid mx-auto px-5 pb-5'>
    <ais-index
          app-id="OQTWW0B4H3"
          api-key="97e17abaac2e3a6bd2677c5176b7ec7d"
          index-name="sights"
          :query-parameters="categoryFilter"
          :query="query"
      >
      <search-bar @search="searchCategory($event)"/>
      <ais-results class='sights-grid'>
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
  props: {
    query: {
      type: String,
      default: '',
    },
  },
  methods: {
    searchCategory(payload) {
      this.filterCategory = payload.label;
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
  created() {
    this.filterCategory = this.$route.query.category;
  },
  components: {
    SightCard, SearchBar,
  },
};
</script>
