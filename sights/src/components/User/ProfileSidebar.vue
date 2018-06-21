<template>
  <aside id="sidebar">
        <profile-meta @open="toggleSidebar" />
        <ul id='navigation' :class='{ open }' >
            <router-link v-for='route of profileRoutes' :key='route.name.name' tag='li' :to="route.name">
                <a>{{ route.label }}</a>
            </router-link>
        </ul>
  </aside>
</template>

<script>
import ProfileMeta from './ProfileMeta';

export default {
  data() {
    return {
      open: false,
    };
  },
  computed: {
    username() {
      return this.$store.getters.getProfile.username;
    },
    profileRoutes() {
      return [
        { label: 'Profile', name: { name: 'Profile', params: { username: this.username } } },
        { label: 'My Sights', name: { name: 'MySights' } },
        { label: 'Liked Sights', name: { name: 'LikedSights' } },
        // { label: 'Settings', name: { name: 'Settings' } },
      ]
      ;
    },
  },
  methods: {
    toggleSidebar() {
      this.open = !this.open;
    },
  },
  components: {
    ProfileMeta,
  },
};
</script>

<style lang='scss' scoped>
@import '@/assets/scss/vars.scss';

#sidebar {
    flex: 0 0 auto;
    background-color: $light;
    box-shadow: 2px 0 2px 0 rgba(43,49,63,.14), 0 3px 5px 0 rgba(43,49,63,.06);
    #navigation {
        list-style-type: none;
        padding: 0;
        text-align: right;
        li {
            font-size: 1.3em;
            font-weight: 500;
            transition: 0.2s all ease-out;
            a {
                display: block;
                padding: 1em;
                color: $black;
            }
            &:hover, &.router-link-exact-active {
                background-color: darken($light, 5%);
            }
        }
    }

    @media only screen and (max-width: 768px) {

      #profile-meta ul {
        display: none;
      }

      #navigation {
        display: none;
        transition: all 0.3s ease;
        &.open {
          display: block;
        }
      }

    }
}
</style>

