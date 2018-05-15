<template lang="html">
<nav class="navbar navbar-expand justify-content-between">
  <router-link :to="{ name: 'Home' }" class="navbar-brand">
    <img class='logo' src="../assets/logo-sights-inverse-notext.png" alt="">
    Sights
  </router-link>
  <ul class="navbar-nav d-flex align-items-center">
    <li class="nav-item">
      <router-link :to="{ name: 'Home' }" class='nav-link'>Home</router-link>
    </li>
    <li class="nav-item">
      <router-link :to="{ name: 'Explore' }" class='nav-link'>Explore</router-link>
    </li>
    <li class="nav-item" v-if='isLoggedIn'>
      <router-link :to="{ name: 'MySights' }" class='nav-link'>My Sights</router-link>
    </li>
    <li class="nav-item" v-if='isLoggedIn'>
      <router-link :to="{ name: 'NewSight' }" class='nav-link'>Plus</router-link>
    </li>
    <li class="nav-item" v-if='isLoggedIn'>
      <router-link  :to="{ name: 'Profile' }" class="nav-link">
        <svg height="50" width="50">
          <circle cx="25" cy="25" r="25" fill="white" />
        </svg>
      </router-link>
    </li>
    <li class="nav-item" v-if='!isLoggedIn'>
      <router-link :to="{ name: 'Register' }" class="nav-link">Register</router-link>
    </li>
    <li class="nav-item" v-if='!isLoggedIn'>
      <router-link :to="{ name: 'Login' }" class="nav-link">Login</router-link>
    </li>
  </ul>
</nav>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar{
  background-color: #09eba7;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  padding-top: 0;
  padding-bottom: 0;
  height: 80px;

  a {
    font-family: 'IBM Plex Sans';
    font-weight: bold;
    color: white;
    font-size: 24px;
  }

  .logo {
    height: 80px;
  }

  .nav-link:hover {
    color: #414141;
  }


}
</style>
