import Vue from 'vue';
import Vuex from 'vuex';
// modules
import auth from './modules/auth';
import user from './modules/user';
import sight from './modules/sight';
import sidebar from './modules/sidebar';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    user,
    sight,
    sidebar,
  },
});

/* eslint no-shadow: 0 */
