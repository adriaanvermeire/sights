/* eslint-disable no-shadow */
import { PROFILE_ACTIVE, PROFILE_INACTIVE } from '@/store/actions/profile';

const state = {
  // single source of data
  username: '',
  top: '',
  likes: '',
  views: '',
  other: '',
  picture: '',
};

const actions = {
  // asynchronous operations
  [PROFILE_ACTIVE]({ commit }, profile) {
    commit(PROFILE_ACTIVE, profile);
  },
};
const mutations = {
  // isolated data mutations
  [PROFILE_ACTIVE](state, newState) {
    state.username = newState.username;
    state.top = newState.top;
    state.likes = newState.likes;
    state.views = newState.views;
    state.other = newState.other;
    state.picture = newState.picture;
  },
  [PROFILE_INACTIVE](state) {
    for (const key of Object.keys(state)) {
      state[key] = '';
    }
  },
};

const getters = {
  // reusable data accessors
  profileName: state => state.username,
  profileTop: state => state.top,
  profileLikes: state => state.likes,
  profileViews: state => state.views,
  profileOther: state => state.other,
  profilePic: state => state.picture,
};

const store = {
  state,
  actions,
  mutations,
  getters,
};

export default store;
