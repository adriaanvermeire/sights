<template lang="html">
<b-form @submit='submit'>
   <b-form-input v-model="name"
                type="text"
                placeholder="Enter the category"
  ></b-form-input>
  <b-button variant="primary" type="submit">
      Create Category
  </b-button>
</b-form>
</template>

<script>
import CategoryService from '@/services/CategoryService';

export default {
  data() {
    return {
      name: '',
    };
  },
  methods: {
    async submit() {
      console.log(this.name);
      if (this.name) {
        const res = (await CategoryService.addCategory({ name: this.name })).data;
        console.log(res);
        if (res.success) {
          this.$router.push({ name: 'Home' });
        } else {
          console.log('Failed to create category');
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
