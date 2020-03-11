import Vue from 'vue';
import Vuex from 'vuex';

import appKey from '@/assets/common/appKey.js';

import search from './module/search/index.js';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appKey: appKey
  },
  mutations: {},
  actions: {},
  modules: {
    search
  }
});
