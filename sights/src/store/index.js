import Vue from 'vue';
import Vuex from 'vuex';
// modules
import auth from './modules/auth';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    user,
  },
});

/* eslint no-shadow: 0 */
