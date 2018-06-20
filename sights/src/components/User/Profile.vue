<template lang="html">
<div id="profile" :class='{own}'>
  <div id="profileMessage" v-if='own'>This is how your public profile is shown to other users. To edit your Sights, go to 'My Sights'.</div>
  <div id="top">
    <avatar :username="username" :size='120' :src='picture'/>
    <div id="right">
      <h1>{{ username }}</h1>
      <div id="stats">
        <span id="likes" title='Total likes'><icon name="heart"></icon>{{ likes }}</span>
        <span id="views" title='Total views'><icon name="eye"></icon>{{ views }}</span>
      </div>
    </div>
  </div>
  <template v-if='topPosts.length'>
    <section id="topSights">
      <h2>Top Sights</h2>
      <div class="sights-grid">
        <sight-card v-for='sight of topPosts' :key='sight._id' :sight='sight'/>
      </div>
    </section>
    <section id="otherSights" v-if='otherPosts.length'>
      <div class="title">
        <h2>More Sights</h2>
        <a-button variant='warning'>
          <router-link :to="{ name: 'Explore', query: { username } }">See all</router-link>
        </a-button>
      </div>
      <div class="sights-grid">
        <sight-card v-for='sight of otherPosts' :key='sight._id' :sight='sight'/>
      </div>
    </section>
  </template>
  <div id="noSights" v-else>
    This user doesn't have any Sights yet.
  </div>

</div>
</template>

<script>
import SightCard from '@/components/Card/SightCard';
import UserService from '@/services/UserService';
import { PROFILE_ACTIVE, PROFILE_INACTIVE } from '@/store/actions/profile';
import Notify from '@/mixins/Notifications';
import Avatar from 'vue-avatar';

export default {
  mixins: [Notify],
  data() {
    return {
    };
  },
  computed: {
    username() {
      return this.$store.getters.profileName;
    },
    topPosts() {
      return this.$store.getters.profileTop || [];
    },
    likes() {
      return this.$store.getters.profileLikes || 0;
    },
    views() {
      return this.$store.getters.profileViews || 0;
    },
    otherPosts() {
      return this.$store.getters.profileOther || [];
    },
    picture() {
      return this.$store.getters.profilePic ? `static/profile/${this.$store.getters.profilePic}` : '';
    },
    own() {
      return this.$route.name === 'Profile';
    },
  },
  async created() {
    const username = this.$route.params.username;
    try {
      const response = (await UserService.getPublicProfile(username)).data;
      if (response.success && response.profile) {
        this.$store.dispatch(PROFILE_ACTIVE, response.profile);
      } else {
        this.danger('This user doesn\'t exist');
      }
    } catch (err) {
      console.error(err);
      this.danger('Something went wrong. Try again later.');
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit(PROFILE_INACTIVE);
    next();
  },
  components: {
    Avatar, SightCard,
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/vars.scss';
#profile{
  text-align: left;
  margin: 1em;

  &.own {
    margin: 0;
  }

  #profileMessage, #noSights{
    padding: 1em 0.5em;
    margin-bottom: 1em;
    background-color: $light;
    box-shadow: 0 0 2px 0 rgba(43,49,63,.14), 0 3px 5px 0 rgba(43,49,63,.06);

  }

  #noSights {
    margin-top: 1em;
  }

  #top {
    display: flex;
    align-items: center;
    #right {
      margin-left: 1em;
      #likes {
        color: $red;
      }

      #views {
        color: $blue;
      }

      #stats {
        span {
          margin-right: 0.8em;
        }
        svg{
          margin-right: 0.5em;
        }
      }
    }
  }

  #topSights, #otherSights {
    margin-top: 3em;
  }

  #otherSights {
    .title {
      display: flex;
      margin-bottom: 1em;

      button {
        margin-left: 1em;
      }
    }
  }
}
</style>
