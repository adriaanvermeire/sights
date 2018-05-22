<template lang="html">
  <div class="callback">Callback</div>
</template>

<script>
export default {
  mounted() {
    this.$auth.handleAuthentication().then((data) => {
      this.$router.push({ name: 'Home' });
    });
  },
};
</script>

<style lang="scss" scoped>
</style>
