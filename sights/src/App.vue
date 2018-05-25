<template>
  <div id="app">
    <navbar class='mb-4'/>
    <router-view/>
  </div>
</template>

<script>
/* eslint-disable no-underscore-dangle */
import Navbar from '@/components/Partials/Navbar';
import axios from 'axios';
import { AUTH_LOGOUT } from '@/store/actions/auth';
import { USER_REQUEST } from '@/store/actions/user';


export default {
  name: 'App',
  components: {
    Navbar,
  },
  created() {
    axios.interceptors.response.use(undefined, err => new Promise(() => {
      if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
        // if you ever get an unauthorized, logout the user
        this.$store.dispatch(AUTH_LOGOUT);
        // you can also redirect to /login if needed !
      }
      throw err;
    }));
    if (this.$store.getters.isAuthenticated) {
      this.$store.dispatch(USER_REQUEST);
    }
  },
};
</script>

<style lang='scss'>
@import './assets/scss/custom-bs.scss';
@import '../node_modules/bootstrap/scss/bootstrap.scss';
@import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
#app {
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
