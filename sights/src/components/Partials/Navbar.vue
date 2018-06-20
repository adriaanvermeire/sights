<template lang="html">
<nav class="navbar navbar-expand-lg navbar-light bg-primary d-flex align-items-stretch justify-content-between">
  <router-link :to='{ name: "Home" }' class='navbar-brand'>
      <img class='logo' src="@/assets/graphics/logo-sights-inverse-notext.png" alt="">
      Sights
  </router-link>
  <h2 class='text-white m-0' v-if='sightName'>{{ sightName }}</h2>
  <div class="collapse navbar-collapse" id="navbarCollapse">
    <ul class='navbar-nav align-items-stretch h-100 navbar-nav'>
      <router-link tag='li' class='nav-item' :to='{ name: "Home"}'>
        <a class='nav-link'>Home</a>
      </router-link>
      <router-link tag='li' class='nav-item' :to='{ name: "Explore"}'>
        <a class='nav-link'>Explore</a>
      </router-link>
      <router-link v-if='isAuthenticated' tag='li' class='nav-item' :to='{ name: "MySights"}'>
        <a class='nav-link'>My Sights</a>
      </router-link>
      <router-link v-if='isAuthenticated' tag='li' class='nav-item' :to='{ name: "NewSight"}'>
        <a class='nav-link'>Add Sights</a>
      </router-link>
      <li class="nav-item dropdown" v-if='isAuthenticated'>
        <dropdown
          v-on-clickaway='hideDropdown'
          ref="dropdown" aria-labelledby="profileDropdown" :actions='dropdownActions'>
          <avatar :username="username" :size='40' />
          <template slot="below">
            <a @click.prevent='logout' id='logout' href="#">Logout</a>
          </template>
        </dropdown>
      </li>
          <router-link v-if='!isAuthenticated' tag='li' class='nav-item' :to='{ name: "Register"}'>
            <a class='nav-link'>Register</a>
          </router-link>
          <router-link v-if='!isAuthenticated' tag='li' class='nav-item' :to='{ name: "Login"}'>
           <a class='nav-link'>Login</a>
          </router-link>
    </ul>
  </div>
</nav>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';
import Notify from '@/mixins/Notifications';
import { AUTH_LOGOUT } from '@/store/actions/auth';
import Avatar from 'vue-avatar';
import Dropdown from '@/components/Dropdown/Dropdown';

export default {
  mixins: [clickaway, Notify],
  data() {
    return {
      sight: '',
    };
  },
  methods: {
    logout() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => {
        this.success('You were logged out successfully!');
        this.$router.push({ name: 'Home' });
      });
    },
    hideDropdown() {
      this.$refs.dropdown.show = false;
    },
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    username() {
      return this.$store.getters.getProfile.username || '';
    },
    sightName() {
      return this.$store.getters.sightName;
    },
    dropdownActions() {
      return [
        {
          name: 'Profile',
          route: { name: 'Profile', params: { username: this.username } },
          id: 0,
        },
        {
          name: 'My Sights',
          route: { name: 'MySights' },
          id: 1,
        },
        {
          name: 'Liked Sights',
          route: { name: 'LikedSights' },
          id: 2,
        },
      ]
      ;
    },
  },
  components: {
    Avatar, Dropdown,
  },
  watch: {
    $route() {
      if (this.$refs.dropdown) {
        this.$refs.dropdown.show = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/vars.scss';

nav{
  box-shadow: inset 0 -1px 0 rgba(88,134,196,.2), 0 2px 10px rgba(34,61,97,.05);
  padding: 0;
  height: 60px;
  z-index: 500;
  font-family: 'IBM Plex Sans';
  font-weight: bold;

  &, & * {
    color: white !important;
  }

  .nav-link {
    display: block;
    padding-top: 1em;
    padding-bottom: 1em;
  }

  .navbar-brand {
    display: flex;
    align-items: center;
    padding-left: 1em;
    padding-right: 1em;
    transition: 0.2s all ease-out;

    &:hover {
      background-color: darken($green, 5%);
    }
  }

  #navbarCollapse {
    flex-grow: 0;

    .nav-item {
      display: flex;
      align-items: center;
      transition: 0.2s all ease-out;
      &:hover, &.router-link-exact-active {
        background-color: darken($green, 5%);
      }

      &:last-child {
        padding: 0 1em;
      }
    }
  }

  .logo {
    height: 60px;
  }
  .b-nav-dropdown {
    a{
      span{
        color: white;
      }
    }
  }
}
</style>
