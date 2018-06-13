<template>
    <div id="search-bar" class="d-flex justify-content-between align-items-center mb-3">
        <ul id='categories' class='d-flex p-0 m-0'>
        <li class='text-muted'>Categories:</li>
        <li v-for='category in categories' :key='category._id'
            class="category nav-item">
            <a-button
            @click.native='categorySearch({id: category._id, name: category.name })'
            :variant='selectedCategory === category.name?"success": "light"'>
            {{ category.name }}
            </a-button>
        </li>
        </ul>
        <!-- <search placeholder='Search sights here...'></search> -->
        <ais-search-box></ais-search-box>
    </div>
</template>

<script>
import CategoryService from '@/services/CategoryService';
import Search from '@/components/Inputs/Search';
import { Component } from 'vue-instantsearch';

export default {
  mixins: [Component],
  data() {
    return {
      categories: [],
      selectedCategory: '',
    };
  },
  methods: {
    async loadCategories() {
      try {
        const response = (await CategoryService.all()).data;
        this.categories = response.categories;
      } catch (err) {
        console.log(err);
      }
    },
    categorySearch(data) {
      const { name } = data;
      if (name === this.selectedCategory) { // disable filter
        this.selectedCategory = '';
        this.searchEvent();
      } else {
        this.selectedCategory = name;
        this.searchEvent(data);
      }
    },
    searchEvent(data = {}) {
      // Check both search and category filters
      this.$emit('search', data);
      this.searchStore.refresh();
    },
  },
  async created() {
    await this.loadCategories();
  },
  components: {
    Search,
  },
};
</script>

<style scoped lang='scss'>
#categories {
  list-style-type: none;
  align-items: center;

  li {
    margin-right: 1rem;

    button.success::after {
      content: '\00d7';
    }
  }
}
</style>
