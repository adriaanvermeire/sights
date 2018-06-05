<template lang="html">
<div class="navigation navbar navbar-expand bg-primary row justify-content-between">
  <div class='justify-content-start d-flex col-3'>
    <router-link :to='{ name: "Home" }' class='navbar-brand'>
      <img class='logo' src="@/assets/graphics/logo-sights-inverse-notext.png" alt="">
      Sights
    </router-link>
  </div>
  <div class="col-3 d-flex justify-content-center">
    <h2 class='text-white m-0' v-if='sightName'>{{ sightName }}</h2>
  </div>
  <div class="collapse navigation-links d-flex align-items-center col-3 justify-content-end">
    <ul class='navbar-nav d-flex m-0 p-0 d-flex align-items-center'>
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
        <a href="#" class='nav-link dropdown-toggle' id='profileDropdown' role='button' data-toggle='dropdown' aria-haspopup="true" aria-expanded="false">
          <avatar :username="username" :size='40'></avatar>
        </a>
        <div class="dropdown-menu" aria-labelledby="profileDropdown">
          <router-link class="dropdown-item" :to="{ name: 'Profile' }">Profile</router-link>
          <router-link class="dropdown-item" :to="{ name: 'Profile' }">Settings</router-link>
          <div class="dropdown-divider"></div>
          <a @click.prevent='logout' class="dropdown-item" href="#">Logout</a>
        </div>
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
</div>
</template>

<script>
import { AUTH_LOGOUT } from '@/store/actions/auth';
import Avatar from 'vue-avatar';

export default {
  data() {
    return {
      sight: '',
    };
  },
  methods: {
    logout() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => {
        this.$router.push({ name: 'Home' });
      });
    },
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    username() {
      return this.$store.state.user.profile.username;
    },
    sightName() {
      return this.$store.state.sight.active.name;
    },
  },
  components: {
    Avatar,
  },
};
</script>

<style lang="scss" scoped>
.navigation{
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  padding-top: 0;
  padding-bottom: 0;
  height: 60px;

  font-family: 'IBM Plex Sans';
  font-weight: bold;
  a, .nav-link {
    color: white;
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
.dropdown-toggle::after {
    display:none;
}
</style>
