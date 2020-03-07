import axios from 'axios';
import API from '@/assets/common/api.js';

export default {
  namespaced: true,
  state: {},
  mutations: {},
  getters: {},
  actions: {
    getMaskInfo({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `${API.returnMaskInfo}/storesByGeo/json?lat=${payload.lat}&lng=${payload.lng}&m=${payload.m}`
          )
          .then(result => {
            if (result.statusText === 'OK') return resolve(result.data);
            else throw reject(result);
          })
          .catch(e => {
            return reject(e);
          });
      });
    }
  }
};
