<template>
  <div id="app">
    <navbar class='mb-4'/>
    <router-view/>
    <notifications
      classes="notification"
      animation-name='notification' position="top right"/>
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
@import './assets/scss/vars.scss';
@import '../node_modules/bootstrap/scss/bootstrap.scss';
@import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
#app {
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  display: flex;
  flex-flow: column;

  &>*:first-child{
    flex: 0 0 auto;
  }

  &>*:nth-child(2){
    flex: 1 1 auto;
  }

}
.notifications {
  z-index: 499 !important;
}
.notification {
  padding: 15px;
  margin: 0 5px 5px;
  margin-top: 0.5rem;
  font-size: 1rem;
  color: $black;
  background-color: $light;
  box-shadow: 0 0 4px 0 rgba(43,49,63,.14), 0 8px 10px 0 rgba(43,49,63,.06);

  .notification-wrapper:first-child & {
    margin-top: calc(60px + 0.5rem);
  }

  &.success {
    border-right: 5px solid $green;
  }

  &.danger {
    border-right: 5px solid $red;
  }

  &.warning {
    border-right: 5px solid $yellow;
  }
}

.notification-enter-active,.notification-leave-active,.notification-move{
  transition: all .5s;
  transform: translateX(0);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(-150%);
}

.notification-enter{
  opacity:0;
  transform: translateX(150%);
}
</style>
