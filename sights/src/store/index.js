import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  // single source of data
  isLoggedIn: !!localStorage.getItem('token'),
};

const actions = {
  // asynchronous operations
  login({ commit }) {
    commit('login'); // Show spinner
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem('token', 'JWT');
        commit('login_success');
        resolve();
      }, 1000);
    });
  },
  logout({ commit }) {
    localStorage.removeItem('token');
    commit('logout');
  },
};
const mutations = {
  // isolated data mutations
  login(state) {
    state.pending = true;
  },
  login_success(state) {
    state.isLoggedIn = true;
    state.pending = false;
  },
  logout(state) {
    state.isLoggedIn = false;
  },
};

const getters = {
  // reusable data accessors
  isLoggedIn: state => state.isLoggedIn,
};

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
});

export default store;

/* eslint no-shadow: 0 */
