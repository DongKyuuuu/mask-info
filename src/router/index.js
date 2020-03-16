import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';
import Meta from 'vue-meta';

Vue.use(Meta);
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('@/views/Location/index.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // modal 출력 여부 검사
  if (to === '/') {
    store.dispatch('check/checkDate');
  }
  next();
});
export default router;
