<template lang="html">
<nav class="navbar navbar-expand-sm navbar-light bg-primary d-flex align-items-stretch justify-content-between">
  <router-link :to='{ name: "Home" }' class='navbar-brand'>
      <img class='logo' src="@/assets/graphics/logo-sights-inverse-notext.png" alt="">
      Sights
  </router-link>
  <h3 class='text-white m-0 align-self-center flex-shrink d-none d-lg-flex' v-if='sightName'>{{ sightName }}</h3>
  <ul class='navbar-nav align-items-stretch h-100'>
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
    <router-link v-if='!isAuthenticated' tag='li' class='nav-item' :to='{ name: "Register"}'>
      <a class='nav-link'>Register</a>
    </router-link>
    <router-link v-if='!isAuthenticated' tag='li' class='nav-item' :to='{ name: "Login"}'>
      <a class='nav-link'>Login</a>
    </router-link>
    <li class="nav-item dropdown" :key="'regular'" v-if='isAuthenticated'>
      <dropdown
        v-if='width > 576'
        v-on-clickaway='hideDropdown'
        ref="dropdown" aria-labelledby="profileDropdown" :actions='dropdownActions'>
        <avatar :username="username" :size='40' />
        <template slot="below">
          <a @click.prevent='logout' id='logout' href="#">Logout</a>
        </template>
      </dropdown>
      <dropdown
        v-if='width <= 576'
        v-on-clickaway='hideDropdown'
        ref="dropdown" aria-labelledby="profileDropdown" :actions='mobileAuthDropdownActions'>
        <avatar :username="username" :size='40' />
        <template slot="below">
          <a @click.prevent='logout' id='logout' href="#">Logout</a>
        </template>
      </dropdown>
    </li>
    <li class="nav-item mobile-dropdown" v-if='!isAuthenticated'>
      <dropdown
        v-on-clickaway='hideDropdown'
        ref="dropdown" aria-labelledby="profileDropdown" :actions='mobileDropdownActions'>
        <icon name="bars" scale='1.5'></icon>
      </dropdown>
    </li>
  </ul>
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
      width: 0,
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
    resize(e) {
      this.width = e.target.innerWidth;
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
      ];
    },
    mobileAuthDropdownActions() {
      return [
        {
          name: 'Explore',
          route: { name: 'Explore' },
          id: 0,
        },
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
      ];
    },
    mobileDropdownActions() {
      return [{
        name: 'Explore',
        route: { name: 'Explore' },
        id: 0,
      },
      {
        name: 'Register',
        route: { name: 'Register' },
        id: 1,
      },
      {
        name: 'Login',
        route: { name: 'Login' },
        id: 2,
      }];
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
  created() {
    window.addEventListener('resize', this.resize);
    this.width = window.innerWidth;
  },
  destroyed() {
    window.removeEventListener('resize', this.resize);
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

  .navbar-nav {
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

      @media only screen and (max-width: 576px) {
        display: none;
      }

      &.dropdown {
        @media only screen and (max-width: 576px) {
          display: flex;
          height: 100%;
        }
      }
      &.mobile-dropdown {
        display: none;
        @media only screen and (max-width: 576px) {
          display: flex;
          height: 100%;
        }
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
