<template>
<form @submit.prevent="submitForm"
  method="post" enctype="multipart/form-data">
    <label for="sightName">Name</label>
     <input v-model.trim="sight.name"
                  id='sightName'
                  type="text"
                  placeholder="Name of your Sight"
                  v-validate="'required|min:5|alpha_num'"
                  name='name'
                  class='form-control' required>
    <label for="sightEntrypoint">Entrypoint (optional)</label>
     <input v-model="sight.entrypoint"
                  id='sightEntrypoint'
                  type="text"
                  placeholder="ex. data"
                  name="entrypoint"
                  class='form-control'>
    <label for="sightFile">Dataset</label>
    <input
    class='form-control'
    type="file"
    id='sightFile'
    @change="onFileSelected"
    name='dataset'
    v-validate="'required|mimes:text/csv,application/json|size:5000'"
    required>
    <label for="sightCategory">Category</label>
    <select
    id='sightCategory'
    v-model="sight.category"
    class="mb-3 form-control" required>
    <option v-for='category of categories' :value="category.value" :key='category.text'>{{category.text}}</option>
    </select>
    <button type="submit" name="button">Create Sight</button>
  </form>
</template>

<script>
import SightService from '@/services/SightService';
import CategoryService from '@/services/CategoryService';
import { SIGHT_ACTIVE } from '@/store/actions/sight';

export default {
  data() {
    return {
      sight: {
        name: '',
        dataset: null,
        category: null,
        entrypoint: '',
      },
      data: [],
      categories: [],
    };
  },
  methods: {
    async submitForm() {
      const fd = new FormData();
      fd.append('dataset', this.sight.dataset, this.sight.dataset.name);
      fd.append('name', this.sight.name);
      fd.append('category', this.sight.category);
      fd.append('entrypoint', this.sight.entrypoint);
      const response = (await SightService.addSight(fd)).data;
      if (response.success) {
        this.$store.dispatch(SIGHT_ACTIVE, { sight: response.currentSight });
        this.$emit('sight-submit', response.data);
      } else {
        // TODO: Change this to notification
        console.log(response.err);
      }
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

<style scoped>

</style>
