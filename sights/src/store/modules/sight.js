/* eslint-disable no-shadow */
import SightService from '@/services/SightService';
import { SIGHT_CHARTS, SIGHT_ACTIVE, SIGHT_INACTIVE } from '../actions/sight';

const state = {
  // single source of data
  active: {},
};

const actions = {
  // asynchronous operations
  [SIGHT_CHARTS]: async ({ commit, state }, payload) => {
    const sight = (await SightService.updateCharts(state.active._id, payload.charts)).data;
    commit(SIGHT_ACTIVE, sight);
  },
  [SIGHT_ACTIVE]({ commit }, payload) {
    commit(SIGHT_ACTIVE, payload.sight);
  },
  [SIGHT_INACTIVE]({ commit }) {
    commit(SIGHT_INACTIVE);
  },
};
const mutations = {
  // isolated data mutations
  [SIGHT_ACTIVE](state, sight) {
    state.active = sight;
  },
  [SIGHT_INACTIVE](state) {
    state.active = '';
  },
};

const getters = {
  // reusable data accessors
  charts: state => state.active.charts,
};

const store = {
  state,
  actions,
  mutations,
  getters,
};

export default store;
