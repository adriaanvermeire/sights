<template lang="html">
<nav class="navbar navbar-expand-lg navbar-light bg-primary d-flex justify-content-between">
  <router-link :to='{ name: "Home" }' class='navbar-brand'>
      <img class='logo' src="@/assets/graphics/logo-sights-inverse-notext.png" alt="">
      Sights
  </router-link>
  <h2 class='text-white m-0' v-if='sightName'>{{ sightName }}</h2>
  <div class="collapse navbar-collapse" id="navbarCollapse">
    <ul class='navbar-nav align-items-center'>
      <li class="nav-item">
        <router-link class='nav-link' :to='{ name: "Home"}'>Home</router-link>
      </li>
      <li class="nav-item">
        <router-link class='nav-link' :to='{ name: "Explore"}'>Explore</router-link>
      </li>
      <template v-if='isAuthenticated'>
        <li class="nav-item">
          <router-link class='nav-link' :to='{ name: "MySights"}'>My Sights</router-link>
        </li>
        <li class="nav-item">
          <router-link class='nav-link' :to='{ name: "NewSight"}'>Add Sight</router-link>
        </li>
        <li class="nav-item pr-0 dropdown">
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
        <li class="nav-item">
          <router-link class='nav-link' :to='{ name: "Register"}'>Register</router-link>
        </li>
        <li class="nav-item pr-0">
          <router-link class='nav-link' :to='{ name: "Login"}'>Login</router-link>
        </li>
      </template>
    </ul>
  </div>
</nav>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';
import { AUTH_LOGOUT } from '@/store/actions/auth';
import Avatar from 'vue-avatar';
import Dropdown from '@/components/Dropdown/Dropdown';

export default {
  mixins: [clickaway],
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
    $route(to, from) {
      this.$refs.dropdown.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/vars.scss';

nav{
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  padding-top: 0;
  padding-bottom: 0;
  height: 60px;

  font-family: 'IBM Plex Sans';
  font-weight: bold;

  &, & * {
    color: white !important;
  }

  #navbarCollapse {
    flex-grow: 0;
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
