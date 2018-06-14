<template>
    <div id="search-bar" class="d-flex flex-sm-nowrap flex-wrap justify-content-between align-items-center mb-3">
        <ul id='categories' class='d-md-flex flex-wrap d-none p-0 m-0'>
          <li class='text-muted'>Categories:</li>
          <li v-for='category in categories' :key='category.value'
              class="category nav-item mb-md-2">
              <a-button
              @click.native='selectCategory(category)'
              :variant='selectedCategory === category?"success": "light"'>
              {{ category.label }}
              </a-button>
          </li>
        </ul>
        <v-select
          class='d-sm-flex d-md-none order-1 order-sm-0' :searchable='false'
          placeholder='Categories' :closeOnSelect='true' v-model='selectedCategory'
          :options="categories"/>
        <search ref="search" class='order-0 order-sm-1'
            v-on-clickaway='blurSearch' placeholder='Search sights here...'></search>
    </div>
</template>

<script>
import CategoryService from '@/services/CategoryService';
import Search from '@/components/Inputs/Search';
import { Component } from 'vue-instantsearch';
import { mixin as clickaway } from 'vue-clickaway';
import vSelect from 'vue-select';

export default {
  mixins: [Component, clickaway],
  data() {
    return {
      categories: [],
      selectedCategory: '',
    };
  },
  watch: {
    selectedCategory() {
      this.categorySearch(this.selectedCategory);
    },
  },
  methods: {
    async loadCategories() {
      try {
        const response = (await CategoryService.all()).data;
        this.categories = response.categories.map(c => ({ label: c.name, value: c._id }));
      } catch (err) {
        console.log(err);
      }
    },
    categorySearch(cat) {
      if (cat) { this.searchEvent(cat); } else {
        this.searchEvent();
      }
    },
    searchEvent(data = {}) {
      // Check both search and category filters
      this.$emit('search', data);
      this.searchStore.refresh();
    },
    blurSearch() {
      this.$refs.search.focus(false);
    },
    selectCategory(e) {
      if (e === this.selectedCategory) { this.selectedCategory = ''; } else this.selectedCategory = e;
    },
  },
  async created() {
    await this.loadCategories();
  },
  components: {
    Search, vSelect,
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


@media screen and (max-width: 575.99px) {
  #search-bar {
    .dropdown, #search {
      width: 100%;
    }
    #search {
      margin-bottom: 1rem;
    }
  }
}

</style>

<style lang="scss">
#search-bar {
  .dropdown-toggle {
  display: flex;
  border: none;
  border-radius: 0;
  box-shadow: 0 0 2px 0 rgba(43,49,63,.14), 0 3px 5px 0 rgba(43,49,63,.06);

    &:hover, &.active {
        box-shadow: 0 0 4px 0 rgba(43,49,63,.14), 0 8px 10px 0 rgba(43,49,63,.06);
    }
    input{
        background-color: #fdfdfd;
        border: 1px solid transparent;
        padding:  0.375rem 0.5rem;
        padding-left: 2rem;

        &:focus, &:active {
            outline: none;
        }

        &::placeholder {
            text-transform: lowercase;
            color: lighten(lightgray, 1%);
        }
    }
}
}
span.selected-tag {
  position: absolute !important;
}
</style>
