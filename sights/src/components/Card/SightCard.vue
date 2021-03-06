<template>
<div class="card p-0">
    <div class="card-body">
        <div class="card-title d-flex justify-content-between align-items-center">
            <router-link :to="{ name: 'SightDetail', params: { id }}" class='text-dark'>
            <h5 class="m-0 text-left">{{ title }}</h5>
            </router-link>
            <div class="actions">
              <button
                @click.prevent='like($event, id)'
                class="btn btn-link p-0" :class='{ liked }' id="like">
                  <div class="heart">
                    <transition name='likeSight'>
                      <icon v-if='liked' name="heart"></icon>
                    </transition>
                      <icon v-if='!liked' name="regular/heart"></icon>
                  </div>
              </button>
            </div>
        </div>
        <div class="card-text text-left" v-if='author'>
          <p id='author'>
            Made by: <router-link :to="{ name: 'PublicProfile', params: { username: author }}">{{ author }}</router-link>
          </p>
        </div>
    </div>
    <div class="card-footer p-1 px-3 d-flex justify-content-between">
      <div id="likeCount">
        <icon name="heart"></icon>
        {{ likes }}
      </div>
      <router-link :to="{ name: 'SightDetail', params: { id }}" class='text-dark'><small>Visit Sight >></small></router-link>
    </div>
</div>
</template>

<script>
import SightService from '@/services/SightService';
import Notify from '@/mixins/Notifications';

export default {
  mixins: [Notify],
  data() {
    return {
      id: '',
      liked: false,
      title: '',
      author: '',
      category: '',
      likes: 0,
    };
  },
  props: ['sight'],
  methods: {
    async like(event, id) {
      if (this.isAuthenticated) {
        if (this.author !== this.user) {
          const button = event.currentTarget;
          this.liked = !this.liked;
          button.classList.toggle('liked');
          this.likes = (await SightService.like(id, this.userId)).data.likeCount;
        } else {
          this.danger('You can\'t like your own Sights');
        }
      } else {
        this.danger('You need to have an account to like a Sight');
      }
    },
  },
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
  },
  mounted() {
    this.title = this.sight.name;
    this.author = this.sight.author;
    this.category = this.sight.category;
    this.liked = this.sight.likes.includes(this.userId);
    this.likes = this.sight.likeCount;
    this.id = this.sight.objectID;
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

    .heart {
      margin-left: 0.5rem;
      position: relative;
      height: 1.2rem;
      width: 1.2rem;
      svg {
        height: inherit;
        width: inherit;
        right: 0.275rem;
        position: absolute;
      }
    }

}
#author {
  a {
    color: $black;
  }
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
