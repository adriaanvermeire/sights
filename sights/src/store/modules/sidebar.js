/* eslint-disable no-shadow */
import { SIDEBAR_SHOW, SIDEBAR_HIDE } from '../actions/sidebar';

const state = {
  // single source of data
  content: {},
  open: false,
};

const actions = {
  // asynchronous operations
  [SIDEBAR_SHOW]: async ({ commit }, payload) => {
    commit(SIDEBAR_SHOW, payload.content);
  },
  [SIDEBAR_HIDE]({ commit }) {
    commit(SIDEBAR_HIDE);
  },
};
const mutations = {
  // isolated data mutations
  [SIDEBAR_SHOW](state, content) {
    state.open = true;
    state.content = content;
  },
  [SIDEBAR_HIDE](state) {
    state.open = false;
    state.content = '';
  },
};

const getters = {
  // reusable data accessors
};

const store = {
  state,
  actions,
  mutations,
  getters,
};

export default store;
