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
      <template v-if='isAuthenticated'>
      <router-link tag='li' class='nav-item' :to='{ name: "MySights"}'>
        <a class='nav-link'>My Sights</a>
      </router-link>
      <router-link tag='li' class='nav-item' :to='{ name: "NewSight"}'>
        <a class='nav-link'>Add Sights</a>
      </router-link>
      <li class="nav-item dropdown">
        <dropdown
          v-on-clickaway='hideDropdown'
          ref="dropdown" aria-labelledby="profileDropdown" :actions='dropdownActions'>
          <avatar :username="username" :size='40' />
          <template slot="below">
            <a @click.prevent='logout' id='logout' href="#">Logout</a>
          </template>
        </dropdown>
      </li>
      </template>
      <template v-else>
          <router-link tag='li' class='nav-item' :to='{ name: "Register"}'>
            <a class='nav-link'>Register</a>
          </router-link>
          <router-link tag='li' class='nav-item' :to='{ name: "Login"}'>
           <a class='nav-link'>Login</a>
          </router-link>
      </template>
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
      dropdownActions: [
        {
          name: 'Profile',
          route: 'Profile',
          id: 0,
        },
        {
          name: 'Settings',
          route: 'Profile',
          id: 1,
        },
      ],
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
      return this.$store.state.user.profile.username || '';
    },
    sightName() {
      return this.$store.getters.sightName;
    },
  },
  components: {
    Avatar, Dropdown,
  },
  watch: {
    $route() {
      this.$refs.dropdown.show = false;
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
