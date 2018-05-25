<template lang="html">
<form class="" @submit.prevent="submitForm" method="post" enctype="multipart/form-data">
  <input
  type="text"
  v-model.trim="sight.name"
  v-validate="'required|min:5|alpha_num'">
  <input
  type="file"
  @change="onFileSelected"
  v-validate="'required|mimes:text/csv,application/json|size:5000'">
  <b-form-select v-model="sight.category" :options="categories" class="mb-3">
  </b-form-select>
  <button type="submit" name="button">Create Sight</button>
</form>
</template>

<script>
import SightService from '@/services/SightService';
import CategoryService from '@/services/CategoryService';

export default {
  data() {
    return {
      sight: {
        name: '',
        dataset: null,
        category: null,
      },
      categories: [],
    };
  },
  methods: {
    async submitForm() {
      const fd = new FormData();
      fd.append('dataset', this.sight.dataset, this.sight.dataset.name);
      fd.append('name', this.sight.name);
      fd.append('category', this.sight.category);
      await SightService.addSight(fd);
      this.$router.push({ name: 'Home' });
    },
    onFileSelected(e) {
      this.sight.dataset = e.target.files[0];
    },
  },
  async mounted() {
    const rawCategories = (await CategoryService.all()).data.categories;
    console.log(rawCategories);
    rawCategories.forEach((cat) => {
      this.categories.push({ value: cat._id, text: cat.name });
    });
  },
};
</script>

<style lang="scss" scoped>
</style>
