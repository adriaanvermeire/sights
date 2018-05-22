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
      <b-nav-item v-if="isAuthenticated" :to="{ name: 'MySights' }">My Sights</b-nav-item>
      <b-nav-item v-if="isAuthenticated" :to="{ name: 'NewSight' }">
        <icon name="plus" color='white'></icon>
      </b-nav-item>
      <b-nav-item-dropdown v-if="isAuthenticated" right>
        <slot name='button-content'>
          <icon name="user" color='white'></icon><span class="sr-only">Profile</span>
        </slot>
        <b-dropdown-item href="#">Profile</b-dropdown-item>
        <b-dropdown-item href="#">Settings</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item @click.prevent='logout'>Logout</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item v-if="!isAuthenticated" :to="{ name: 'Register' }">
        <strong>Register</strong>
      </b-nav-item>
      <b-nav-item v-if="!isAuthenticated" :to="{ name: 'Login' }">Login</b-nav-item>
    </b-navbar-nav>
  </b-collapse>
</b-navbar>
</template>

<script>
import { AUTH_LOGOUT } from '@/store/actions/auth';

export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.dispatch(AUTH_LOGOUT);
    },
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
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
