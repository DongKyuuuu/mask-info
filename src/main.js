import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

app.use('/robots.txt', express.static(path.join(__dirname, 'dist/static/robots.txt')));
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
