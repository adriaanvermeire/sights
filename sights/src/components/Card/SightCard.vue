<template>
<div class="card col-xl-2 col-lg-4 col-md-6 col-sm-12 m-2">
    <div class="card-body">
        <div class="card-title d-flex justify-content-between align-items-center">
            <h5 class="m-0">{{ title }}</h5>
            <button class="btn btn-link" id="like">
                <icon name="heart"></icon>
            </button>
        </div>
        <div class="card-text">

        </div>
    </div>
</div>
</template>

<script>
import Card from './CardBase';

export default {
  data() {
    return {
      title: '',
      author: '',
      category: '',
    };
  },
  props: ['sight'],
  mounted() {
    this.title = this.sight.name;
    this.author = this.sight.author.username;
    this.category = this.sight.category.name;
  },
  components: {
    Card,
  },
};
</script>

<style scoped lang='scss'>
button#like {
    padding: 0;
}
</style>
