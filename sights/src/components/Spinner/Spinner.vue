<template>
<div id="spinner">
    <spinner color='#09eba7'/>
    <span :v-model='text'></span>
</div>
</template>

<script>
import Spinner from 'vue-spinner-component/src/Spinner';

export default {
  props: ['text'],
  components: {
    Spinner,
  },
};
</script>

<style scoped>

</style>
