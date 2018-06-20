import Vue from 'vue';
import Vuex from 'vuex';
// modules
import auth from './modules/auth';
import user from './modules/user';
import sight from './modules/sight';
import detail from './modules/detail';
import profile from './modules/profile';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    user,
    sight,
    detail,
    profile,
  },
});

/* eslint no-shadow: 0 */
