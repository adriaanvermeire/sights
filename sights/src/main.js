import Vue from 'vue';
import VeeValidate from 'vee-validate';
import 'vue-awesome/icons';
import VueChartkick from 'vue-chartkick';
import Chart from 'chart.js';

import Icon from 'vue-awesome/components/Icon';
import utils from '@/utils';
import App from './App';
import router from './router';
import store from './store';
// styles
import './assets/scss/custom-bs.scss';
import './assets/scss/vars.scss';

Vue.config.productionTip = false;

// Vue package registration
Vue.use(VeeValidate, { events: 'change', fieldsBagName: 'validationFields' });
Vue.use(VueChartkick, { adapter: Chart });
Vue.component('icon', Icon);

const token = localStorage.getItem('user-token');
if (token) {
  utils.setAuthorizationHeader(token);
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
