/* eslint-disable no-shadow */
import SightService from '@/services/SightService';
import { SIGHT_CHARTS, SIGHT_ACTIVE, SIGHT_INACTIVE, SIGHT_LIKE, SIGHT_UPDATE_CATEGORY,
  SIGHT_UPDATE_DESCRIPTION, SIGHT_UPDATE_NAME } from '../actions/sight';

const state = {
  // single source of data
  author: false,
  category: false,
  charts: [],
  name: '',
  id: false,
  createdAt: false,
  likes: [],
  liked: false,
  description: '',
  fields: [],
};

const actions = {
  // asynchronous operations
  [SIGHT_CHARTS]: async ({ commit, state }, payload) => {
    const sight = (await SightService.updateCharts(state.id, payload.charts)).data;
    commit(SIGHT_ACTIVE, sight);
  },
  [SIGHT_ACTIVE]({ commit, rootState }, payload) {
    const { sight } = payload;
    sight.liked = sight.likes.includes(rootState.user.profile._id);
    sight.fields = sight.dataset.fields.map(f => f.name);
    delete sight.dataset;
    commit(SIGHT_ACTIVE, sight);
  },
  [SIGHT_INACTIVE]({ commit }) {
    commit(SIGHT_INACTIVE);
  },
  [SIGHT_LIKE]: async ({ commit, state, rootState }, payload) => {
    const user = rootState.user.profile._id;
    (await SightService.like(state.id, user));
    commit(SIGHT_LIKE, payload.liked, user);
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
    state.likes = sight.likes;
    state.liked = sight.liked;
    state.description = sight.description;
    state.fields = sight.fields;
  },
  [SIGHT_INACTIVE](state) {
    state.author = false;
    state.category = false;
    state.charts = [];
    state.name = '';
    state.id = false;
    state.createdAt = false;
    state.likes = [];
    state.liked = false;
    state.description = '';
  },
  [SIGHT_LIKE](state, liked, user) {
    state.liked = liked;
    if (liked) {
      state.likes.push(user);
    } else {
      state.likes.splice(state.likes.indexOf(user, 1));
    }
  },
  [SIGHT_UPDATE_CATEGORY](state, category) {
    state.category = category;
  },
  [SIGHT_UPDATE_DESCRIPTION](state, description) {
    state.description = description;
  },
  [SIGHT_UPDATE_NAME](state, name) {
    state.name = name;
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
  sightDescription: state => state.description,
};

const store = {
  state,
  actions,
  mutations,
  getters,
};

export default store;
