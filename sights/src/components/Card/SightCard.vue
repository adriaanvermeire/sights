<template>
<div class="card p-0">
    <div class="card-body">
        <div class="card-title d-flex justify-content-between align-items-center">
            <h5 class="m-0 text-left">{{ title }}</h5>
            <div class="actions">
              <button
                @click.prevent='like($event, id)'
                class="btn btn-link p-0" :class='{ liked }' id="like">
                  <transition name='likeSight'>
                    <icon v-if='liked' name="heart"></icon>
                  </transition>
                    <icon v-if='!liked' name="regular/heart"></icon>
              </button>
              <button class="btn btn-link p-0" id="share">
                  <icon name="share-alt"></icon>
              </button>
            </div>
        </div>
        <div class="card-text text-left">
          <p>
            Made by: {{ author }}
          </p>
        </div>
    </div>
    <div class="card-footer p-1">
      <router-link :to="{ name: 'SightDetail', params: { id }}" class='text-dark'><small>Visit Sight >></small></router-link>
    </div>
</div>
</template>

<script>
import Card from './CardBase';

export default {
  data() {
    return {
      id: '',
      liked: false,
      title: '',
      author: '',
      category: '',
    };
  },
  props: ['sight'],
  methods: {
    like(event, id) {
      const button = event.currentTarget;
      this.liked = !this.liked;
      button.classList.toggle('liked');
      // this.sightService.like(id, user);
    },
  },
  mounted() {
    this.title = this.sight.name;
    this.author = this.sight.author.username;
    this.category = this.sight.category.name;
    // this.liked =
    this.id = this.sight._id;
  },
  components: {
    Card,
  },
};
</script>

<style scoped lang='scss'>
@import '@/assets/scss/vars.scss';

.card {
  box-shadow: 0 0 2px 0 rgba(43,49,63,.14), 0 3px 5px 0 rgba(43,49,63,.06);
  background-color: $light;
  border: none;
  border-radius: 0;
  .card-footer {
    border-top: none;
  }
}

button#like {

    color: gray;
   &.liked, &:hover {
     color: $red;
   }
    padding: 0;
}

.likeSight-enter-active {
  animation: bounce-in 0.5s;
}
.likeSight-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

// .slide-fade-enter-active {
//   transition: all .3s ease;
// }
// .slide-fade-leave-active {
//   transition: all .2s ease;
// }
// .slide-fade-enter, .slide-fade-leave-to {
//     transform-origin: top center;
//   transform: scale(0.7);
//   opacity: 0;
// }

</style>
