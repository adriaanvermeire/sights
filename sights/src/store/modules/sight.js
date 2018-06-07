/* eslint-disable no-shadow */
import SightService from '@/services/SightService';
import { SIGHT_CHARTS, SIGHT_ACTIVE, SIGHT_INACTIVE } from '../actions/sight';

const state = {
  // single source of data
  author: false,
  category: false,
  charts: [],
  name: '',
  id: false,
  createdAt: false,
};

const actions = {
  // asynchronous operations
  [SIGHT_CHARTS]: async ({ commit, state }, payload) => {
    const sight = (await SightService.updateCharts(state.id, payload.charts)).data;
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
    state.author = sight.author.username;
    state.category = sight.category.name;
    state.charts = sight.charts;
    state.name = sight.name;
    state.id = sight._id;
    state.createdAt = sight.createdAt;
  },
  [SIGHT_INACTIVE](state) {
    state.author = false;
    state.category = false;
    state.charts = [];
    state.name = '';
    state.id = false;
    state.createdAt = false;
  },
};

const getters = {
  // reusable data accessors
  sightCharts: state => state.charts,
  sightAuthor: state => state.author,
  sightCategory: state => state.category,
  sightName: state => state.name,
  sightId: state => state.id,
  sightCreation: state => state.createdAt,
};

const store = {
  state,
  actions,
  mutations,
  getters,
};

export default store;
