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
Vue.use(require('vue-moment'));

Vue.component('icon', Icon);

const token = localStorage.getItem('user-token');
if (token) {
  utils.setAuthorizationHeader(token);
}

Vue.filter('join', (array) => {
  if (!array.length) return '';
  const commad = array.map((a, i) => {
    if (!a) a = 'n/a';
    if (i === array.length - 2) return `${a} and`;
    else if (i === array.length - 1) return `${a}`;
    return `${a},`;
  });
  return commad.join(' ');
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
