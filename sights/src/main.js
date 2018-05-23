import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VeeValidate from 'vee-validate';
import 'vue-awesome/icons';

import Icon from 'vue-awesome/components/Icon';
import utils from '@/utils';
import App from './App';
import router from './router';
import store from './store';
// styles
import './assets/scss/custom-bs.scss';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VeeValidate);
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
