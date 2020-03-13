import Vue from 'vue';
import Vuex from 'vuex';

import search from './module/search/index.js';
import check from './module/check/index.js';

Vue.use(Vuex);

const subscriber = store => {
  store.subscribe((mutation, state) => {
    localStorage.setItem('showModal', JSON.stringify(state));
  });
};

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    initStore() {
      if (localStorage.getItem('showModal')) {
        this.replaceState(
          Object.assign(JSON.parse(localStorage.getItem('showModal')))
        );
      }
    }
  },
  modules: {
    search,
    check
  },
  plugins: [subscriber]
});
