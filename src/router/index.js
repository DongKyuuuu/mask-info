import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Location/index.vue')
  }
  // {
  //   path: '/location',
  //   name: 'location',
  //   component: () => import('@/views/Location/index.vue')
  // }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  console.log('check');
  if (to === '/') {
    store.dispatch('check/checkDate');
  }
  next();
});
export default router;
