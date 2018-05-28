<template lang="html">
<div id="newSight">
  <form v-if='!submitted' @submit.prevent="submitForm"
  method="post" enctype="multipart/form-data">
    <label for="sightName">Name</label>
     <b-form-input v-model.trim="sight.name"
                  id='sightName'
                  type="text"
                  placeholder="Name of your Sight"
                  v-validate="'required|min:5|alpha_num'"
                  name='name'
                  required
    ></b-form-input>
    <label for="sightEntrypoint">Entrypoint (optional)</label>
     <b-form-input v-model="sight.entrypoint"
                  id='sightEntrypoint'
                  type="text"
                  placeholder="ex. data"
                  name="entrypoint"
    ></b-form-input>
    <label for="sightFile">Dataset</label>
    <input
    type="file"
    id='sightFile'
    @change="onFileSelected"
    name='dataset'
    v-validate="'required|mimes:text/csv,application/json|size:5000'"
    required>
    <label for="sightCategory">Category</label>
    <b-form-select id='sightCategory' v-model="sight.category" :options="categories" class="mb-3" required>
    </b-form-select>
    <button type="submit" name="button">Create Sight</button>
  </form>
  <pick-types v-if='submitted' v-bind:data='data'/>
</div>
</template>

<script>
import SightService from '@/services/SightService';
import CategoryService from '@/services/CategoryService';
import PickTypes from '@/components/Sights/NewSight/PickTypes';
import { USER_SIGHT } from '@/store/actions/user';

export default {
  data() {
    return {
      sight: {
        name: '',
        dataset: null,
        category: null,
        entrypoint: '',
      },
      categories: [],
      submitted: false,
      data: [],
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
        this.data = response.data;
        this.$store.dispatch(USER_SIGHT, { sight: response.currentSight });
        this.submitted = true;
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
  components: {
    PickTypes,
  },
};
</script>

<style lang="scss" scoped>
</style>
