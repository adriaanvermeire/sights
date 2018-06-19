/* eslint-disable no-shadow */
import { DETAIL_SIDEBARTYPE, DETAIL_SIDEBAR } from '../actions/detail';

const state = {
  // single source of data
  type: 'guest',
  sidebarOpen: false,
};

const actions = {
  // asynchronous operations

};
const mutations = {
  // isolated data mutations
  [DETAIL_SIDEBARTYPE](state, value) {
    state.type = value;
  },
  [DETAIL_SIDEBAR](state) {
    state.sidebarOpen = !state.sidebarOpen;
  },
};

const getters = {
  // reusable data accessors
  sidebarType: state => state.type,
  sidebarOpen: state => state.sidebarOpen,
};

const store = {
  state,
  actions,
  mutations,
  getters,
};

export default store;
