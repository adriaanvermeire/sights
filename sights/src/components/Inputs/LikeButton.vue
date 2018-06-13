<template>
    <button
    @click.prevent='like($event, id)'
    class="btn btn-link p-0" :class='{ liked }' id="like">
        <transition name='likeSight'>
            <icon v-if='liked' name="heart"></icon>
        </transition>
            <icon v-if='!liked' name="regular/heart"></icon>
    </button>
</template>

<script>
import Notify from '@/mixins/Notifications';
import SightService from '@/services/SightService';
import { SIGHT_LIKE } from '@/store/actions/sight';

export default {
  mixins: [Notify],
  props: ['sight'],
  computed: {
    user() {
      return this.$store.getters.getProfile.username;
    },
    userId() {
      return this.$store.getters.getProfile._id;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    author() { return this.sight.author; },
    likes() { return this.sight.likes; },
    liked() { return this.sight.liked; },
    id() { return this.sight.id; },
  },
  methods: {
    async like(event, id) {
      if (this.isAuthenticated) {
        if (this.author !== this.user) {
          this.$store.dispatch(SIGHT_LIKE, { liked: !this.liked });
          this.$el.classList.toggle('liked');
        } else {
          this.warning('You can\'t like your own Sights!');
        }
      } else {
        this.warning('You have to be logged in to like a Sight');
      }
    },
  },
};
</script>

<style lang='scss' scoped>
@import '@/assets/scss/vars.scss';
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
</style>
