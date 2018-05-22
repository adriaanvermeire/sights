import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'vue-awesome/icons';
// import feather from 'vue-icon';
import Icon from 'vue-awesome/components/Icon';
import { setAuthorizationHeader } from '@/utils';
import App from './App';
import router from './router';
import store from './store';
// styles
import './assets/scss/custom-bs.scss';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
// Vue.use(feather);
Vue.component('icon', Icon);

const token = localStorage.getItem('user-token');
if (token) {
  setAuthorizationHeader(token);
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
