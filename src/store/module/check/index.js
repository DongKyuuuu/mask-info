import axios from 'axios';
import moment from 'moment';

export default {
  namespaced: true,
  state: {
    show: true,
    date: ''
  },
  mutations: {
    updateDate(state, payload) {
      state.date = payload;
    },
    updateShow(state, payload) {
      state.show = payload;
    }
  },
  getters: {},
  actions: {
    checkDate({ state, commit }) {
      if (!state.show) {
        if (!state.date) {
          commit('updateDate', moment(new Date()).format('YYYY-MM-DD'));
        } else {
          const saveDate = state.date;
          const nowDate = moment(new Date()).format('YYYY-MM-DD');

          let gte = moment(saveDate);
          let lte = moment(nowDate);

          const duration = moment.duration(lte.diff(gte));
          if (duration.asDays() >= 1) {
            commit('updateDate', '');
            commit('updateShow', true);
          }
        }
      }
    },
    changeDate({ commit }, payload) {
      commit('updateDate', payload);
    },
    changeShow({ commit }, payload) {
      commit('updateShow', payload);
    }
  }
};
