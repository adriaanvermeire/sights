import Vue from 'vue';
import Vuex from 'vuex';
// modules
import auth from './modules/auth';
import user from './modules/user';
import sight from './modules/sight';
import detail from './modules/detail';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    user,
    sight,
    detail,
  },
});

/* eslint no-shadow: 0 */
