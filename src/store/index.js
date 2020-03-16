import Vue from 'vue';
import Vuex from 'vuex';

import search from './module/search/index.js';
import check from './module/check/index.js';

Vue.use(Vuex);

// 로컬스토리지에 현재 state 저장
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
