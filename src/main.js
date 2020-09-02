import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import 'es6-promise/auto';

Vue.use(Vuex);
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
