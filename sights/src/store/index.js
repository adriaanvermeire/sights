import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  // single source of data
};

const actions = {
  // asynchronous operations
  addNote({ commit }) {
    commit('add_note');
  },

};
const mutations = {
  // isolated data mutations
  add_note(state) {
    const newNote = {
      text: 'New note',
      favorite: false,
    };

    // only mutators can mutate the state
    state.notes.push(newNote);
    state.activeNote = newNote;
  },
};

const getters = {
  // reusable data accessors
};

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
});

export default store;

/* eslint no-shadow: 0 */
