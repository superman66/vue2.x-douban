import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Vue from 'vue';
import axios from 'axios';
import App from './App';
import routes from './router';
import store from './store/store'

Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app');
