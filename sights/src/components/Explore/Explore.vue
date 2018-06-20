<template lang="html">
  <div id="explore" class='container-fluid mx-auto px-5 pb-5'>
    <ais-index
          :searchStore="searchStore"
          :index-name="searchIndex"
          :query-parameters="filter"
          :query="query"
      >
      <search-bar @search="searchCategory($event)"/>
      <spinner v-if='loading' text='Loading Sights'/>
      <ais-results class='sights-grid'>
        <template slot-scope="{ result }">
          <sight-card :key='result.objectID' :sight='result'/>
        </template>
      </ais-results>
      <ais-no-results>
          <template slot-scope="props">
            <p>
              No Sights found
              <span v-if='filterCategory'>in category <b>{{ filterCategory }}</b></span>
              <span v-if="props.query"> with searchterm <b>{{ props.query }}</b></span>
              <span v-if="!filterCategory && !props.query"> for this query</span>...
            </p>
            <template v-if='isAuthenticated'>
              <a-button variant='success'><router-link :to="{ name: 'NewSight' }">Add some here!</router-link></a-button>
            </template>
            <template v-else>
              <div class="no-results-action">
                <a-button variant='success-outline'>
                  <router-link :to="{ name: 'Register'}">Register</router-link>
                </a-button>
                or
                <a-button variant='success'>
                  <router-link :to="{ name: 'Login'}">Login</router-link>
                </a-button>
                <p class='mt-2'>to add some!</p>
              </div>
            </template>
          </template>
      </ais-no-results>
    </ais-index>
  </div>
</template>

<script>
import { createFromAlgoliaCredentials } from 'vue-instantsearch';
import Spinner from '@/components/Spinner/Spinner';
import SightCard from '@/components/Card/SightCard';
import SearchBar from './SearchBar';

export default {
  data() {
    return {
      sights: [],
      searchStore: '',
      index: '',
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
      this.$router.push({ query: { category: payload.label } });
    },
  },
  computed: {
    categoryFilter() {
      return decodeURIComponent(this.$route.query.category || '');
    },
    usernameFilter() {
      return decodeURIComponent(this.$route.query.username || '');
    },
    filter() {
      const filter = { filters: '' };
      if (this.categoryFilter) {
        if (this.categoryFilter) {
          filter.filters = `category:${this.categoryFilter || ''}`;
        }
      }
      if (this.usernameFilter) {
        if (this.categoryFilter) {
          filter.filters += ' AND ';
        }
        filter.filters += `author:${this.usernameFilter || ''}`;
      }
      console.log(filter);
      return filter;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    loading() {
      return this.searchStore._isSearchStalled;
    },
  },
  created() {
    this.searchStore = createFromAlgoliaCredentials('OQTWW0B4H3', '97e17abaac2e3a6bd2677c5176b7ec7d');
    this.searchIndex = process.env.ALGOLIA_INDEX;
  },
  components: {
    SightCard, SearchBar, Spinner,
  },
};
</script>
