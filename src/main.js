import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// 로컬스토리지에 있는 state 값 불러오기
store.dispatch('initStore');

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
