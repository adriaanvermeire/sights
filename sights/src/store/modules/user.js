/* eslint-disable no-shadow */
import Vue from 'vue';
import UserService from '@/services/UserService';
import { USER_REQUEST, USER_ERROR, USER_SUCCESS } from '../actions/user';
import { AUTH_LOGOUT } from '../actions/auth';

const state = {
  // single source of data
  status: '',
  profile: {},
};

const actions = {
  // asynchronous operations
  [USER_REQUEST]({ commit, dispatch }) {
    commit(USER_REQUEST);
    UserService.profile()
      .then((resp) => {
        const { user } = resp.data;
        commit(USER_SUCCESS, user);
      })
      .catch(() => {
        commit(USER_ERROR);
        // if resp is unauthorized, logout, to
        dispatch(AUTH_LOGOUT);
      });
  },
};

const mutations = {
  // isolated data mutations
  [USER_REQUEST](state) {
    state.status = 'loading';
  },
  [USER_SUCCESS](state, user) {
    state.status = 'success';
    Vue.set(state, 'profile', user);
  },
  [USER_ERROR](state) {
    state.status = 'error';
  },
  [AUTH_LOGOUT](state) {
    state.profile = {};
  },
};

const getters = {
  // reusable data accessors
  getProfile: state => state.profile,
  isProfileLoaded: state => !!state.profile.name,
};

const store = {
  state,
  actions,
  mutations,
  getters,
};

export default store;
