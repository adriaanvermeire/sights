import Vue from 'vue';
import Vuex from 'vuex';
// modules
import auth from './modules/auth';
import user from './modules/user';
import sight from './modules/sight';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    user,
    sight,
  },
});

/* eslint no-shadow: 0 */
