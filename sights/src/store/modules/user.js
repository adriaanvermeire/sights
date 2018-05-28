/* eslint-disable no-shadow */
import Vue from 'vue';
import UserService from '@/services/UserService';
import { USER_REQUEST, USER_ERROR, USER_SUCCESS, USER_SIGHT, USER_NOSIGHT } from '../actions/user';
import { AUTH_LOGOUT } from '../actions/auth';

const state = {
  // single source of data
  status: '',
  profile: {},
  currentSight: '',
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
  [USER_SIGHT]({ commit }, payload) {
    commit(USER_SIGHT, payload.sight);
  },
  [USER_NOSIGHT]({ commit }) {
    commit(USER_NOSIGHT);
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
  [USER_SIGHT](state, sight) {
    state.currentSight = sight;
  },
  [USER_NOSIGHT](state) {
    state.currentSight = '';
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
