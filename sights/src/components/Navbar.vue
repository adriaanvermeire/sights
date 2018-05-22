<template lang="html">
<b-navbar variant="primary" toggleable="sm">
  <b-navbar-brand :to="{ name: 'Home' }">
    <img class='logo' src="@/assets/graphics/logo-sights-inverse-notext.png" alt="">
    Sights
  </b-navbar-brand>
  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
  <b-collapse is-nav id="nav_collapse">
    <b-navbar-nav class='ml-auto'>
      <b-nav-item :to="{ name: 'Home' }">Home</b-nav-item>
      <b-nav-item :to="{ name: 'Explore' }">Explore</b-nav-item>
      <b-nav-item v-if="isLoggedIn" :to="{ name: 'MySights' }">My Sights</b-nav-item>
      <b-nav-item v-if="isLoggedIn" :to="{ name: 'NewSight' }">
        <icon name="plus" color='white'></icon>
      </b-nav-item>
      <b-nav-item v-if="isLoggedIn" :to="{ name: 'Profile' }">
        <icon name="user"></icon>
      </b-nav-item>
      <b-nav-item v-if="!isLoggedIn" :to="{ name: 'Register' }">
        <strong>Register</strong>
      </b-nav-item>
      <b-nav-item v-if="!isLoggedIn" :to="{ name: 'Login' }">Login</b-nav-item>
    </b-navbar-nav>
  </b-collapse>
</b-navbar>
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
      return !this.$store.getters.isLoggedIn;
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar{
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

}
</style>
