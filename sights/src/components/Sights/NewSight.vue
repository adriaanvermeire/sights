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
  <button type="submit" name="button">Create Sight</button>
</form>
</template>

<script>
import SightService from '@/services/SightService';

export default {
  data() {
    return {
      sight: {
        name: '',
        dataset: null,
      },
    };
  },
  methods: {
    async submitForm() {
      const fd = new FormData();
      fd.append('dataset', this.sight.dataset, this.sight.dataset.name);
      fd.append('name', this.sight.name);
      const resp = await SightService.addSight(fd);
      console.log(resp.data);
    },
    onFileSelected(e) {
      this.sight.dataset = e.target.files[0];
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
