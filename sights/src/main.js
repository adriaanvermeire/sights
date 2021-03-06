import Vue from 'vue';
import VeeValidate from 'vee-validate';
import 'vue-awesome/icons';
import VueChartkick from 'vue-chartkick';
import Chart from 'chart.js';
import InstantSearch from 'vue-instantsearch';
import Notifications from 'vue-notification';
import VueTabs from 'vue-nav-tabs';
import 'vue-nav-tabs/themes/vue-tabs.css';
import aButton from '@/components/Inputs/Button';
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
Vue.use(InstantSearch);
Vue.use(Notifications);
Vue.use(VueTabs);
Vue.use(require('vue-moment'));

Vue.component('icon', Icon);
Vue.component('a-button', aButton);

const token = localStorage.getItem('user-token');
if (token) {
  utils.setAuthorizationHeader(token);
}

Vue.filter('join', (array) => {
  if (!array.length) return '';
  const commad = array.map((el, i) => {
    let a = el;
    if (!a) a = 'n/a';
    if (i === array.length - 2) return `${a} and`;
    else if (i === array.length - 1) return `${a}`;
    return `${a},`;
  });
  return commad.join(' ');
});

Vue.filter('bytes', (n) => {
  let num = n;

  const neg = num < 0;
  const units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  if (neg) {
    num = -num;
  }

  if (num < 1) {
    return `${(neg ? '-' : '') + num} B`;
  }

  const exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1);
  num = (num / (1000 ** exponent)).toFixed(2) * 1;
  const unit = units[exponent];

  return `${(neg ? '-' : '') + num} ${unit}`;
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
