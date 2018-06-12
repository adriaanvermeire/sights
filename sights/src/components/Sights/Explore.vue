<template lang="html">
  <div id="explore" class='container-fluid mx-auto px-5 pb-5'>
    <div id="top-bar" class="d-flex justify-content-between align-items-center mb-3">
      <ul id='categories' class='d-flex p-0 m-0'>
        <li class='text-muted'>Categories:</li>
        <li
          v-for='category in categories' :key='category._id'
          class="category nav-item">
          <a-button
            v-if='selectedCategory === category.name'
            @click.native='filter({ name: category.name, category: category._id })'
            variant='success'>
            {{ category.name }}
          </a-button>
          <a-button
            v-else
            @click.native='filter({ name: category.name, category: category._id })'
            variant='light'>
            {{ category.name }}
          </a-button>
        </li>
      </ul>
      <search placeholder='Search sights here...'></search>
    </div>
    <template v-show='!loading'>
         <div class="centered">
          <section id='cards'>
            <sight-card v-for='sight in sights' :key='sight._id' :sight='sight'/>
            <p v-if="!sights.length">
              There are no Sights to be found!
            </p>
          </section>
        </div>
    </template>
  </div>
</template>

<script>
import SightService from '@/services/SightService';
import CategoryService from '@/services/CategoryService';
import SightCard from '@/components/Card/SightCard';
import Search from '@/components/Inputs/Search';

export default {
  data() {
    return {
      sights: [],
      loading: true,
      categories: [],
      selectedCategory: '',
    };
  },
  methods: {
    async loadSights(filter) {
      try {
        const response = (await SightService.getSights(filter)).data;
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
    async filter({ category, name }) {
      if (name === this.selectedCategory) { // disable filter
        this.selectedCategory = '';
        this.loadSights();
      } else {
        this.selectedCategory = name;
        this.loadSights({ category });
      }
    },
  },
  async created() {
    await this.loadSights();
    await this.loadCategories();
    this.loading = false;
  },
  components: {
    SightCard, Search,
  },
};
</script>

<style lang="scss" scoped>
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
#cards {
  display: grid;
  grid-gap: 1rem;
  justify-content: space-between;
}

</style>

<style lang="scss">

@media screen and (max-width: 40em) {
  #cards {
    grid-template-columns: repeat(auto-fill, 100%);
  }
}
@media screen and (min-width: 40em) {
  #cards {
    grid-template-columns: repeat(auto-fill, 48%);
  }
}

@media screen and (min-width: 60em) {
  #cards {
      grid-template-columns: repeat(auto-fill, minmax(19%, 32%));
  }
}

@media screen and (min-width: 80em) {
  #cards {
    grid-template-columns: repeat(auto-fill, minmax(0, 19%));
  }
}


@media screen and (min-width: 52em) {
    .centered {

    }
}
</style>
