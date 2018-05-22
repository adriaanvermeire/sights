/* eslint-disable no-shadow */
import AuthenticationService from '@/services/AuthenticationService';
import utils from '@/utils';

import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from '../actions/auth';
import { USER_REQUEST } from '../actions/user';

const state = {
  // single source of data
  token: localStorage.getItem('user-token') || '',
  status: '',
  hasLoadedOnce: false,
};

const actions = {
  // asynchronous operations
  [AUTH_REQUEST]: ({ commit, dispatch }, user) => new Promise((resolve, reject) => {
    // The Promise used for router redirect in login
    commit(AUTH_REQUEST);
    AuthenticationService.authenticate(user)
      .then((resp) => {
        const token = resp.data.token;
        localStorage.setItem('user-token', token); // store the token in localstorage
        utils.setAuthorizationHeader(token);
        commit(AUTH_SUCCESS, token);
        dispatch(USER_REQUEST);
        resolve(resp);
      })
      .catch((err) => {
        commit(AUTH_ERROR, err);
        localStorage.removeItem('user-token'); // if the request fails, remove any possible user token if possible
        reject(err);
      });
  }),
  [AUTH_LOGOUT]: ({ commit }) => new Promise((resolve) => {
    commit(AUTH_LOGOUT);
    localStorage.removeItem('user-token'); // clear your user's token from localstorage
    utils.setAuthorizationHeader();
    resolve();
  }),
};
const mutations = {
  // isolated data mutations
  [AUTH_REQUEST](state) {
    state.status = 'loading';
  },
  [AUTH_SUCCESS](state, token) {
    state.status = 'success';
    state.token = token;
    state.hasLoadedOnce = true;
  },
  [AUTH_ERROR](state) {
    state.status = 'error';
    state.hasLoadedOnce = true;
  },
  [AUTH_LOGOUT](state) {
    state.token = '';
  },
};

const getters = {
  // reusable data accessors
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
};

const store = {
  state,
  actions,
  mutations,
  getters,
};

export default store;
